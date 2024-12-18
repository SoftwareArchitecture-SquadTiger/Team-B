const Credential = require('../models/Credential');
const { produceUserDataSaveRequest , produceUserDataFetchRequest } = require('../events/producer');
const { createAndEncryptToken } = require('./token.service');

// Store pending login requests 
// correlationId -> { email, userType, plainPassword }
const pendingLogins = {};

// correlationId -> { email, userType }
const pendingUserData = {};

/**
 * Handle login request
 * @param {Object} msg - { userId, email, password, userType }
 */
async function handleLoginRequest(msg) {
  const { userId, email, password, userType } = msg;

  try {
    // Step 1: Fetch the user's credentials
    const credential = await Credential.findOne({ email, userType });
    if (!credential) {
      throw new Error('Invalid credentials');
    }

    // Step 2: Hash the provided password using the encryption service
    const response = await axios.post(`${process.env.ENCRYPTION_SERVICE_URL}/hash`, {
      password,
    });

    if (response.status !== 200 || !response.data.hashedPassword) {
      throw new Error('Failed to hash password using encryption service');
    }

    const hashedPassword = response.data.hashedPassword;

    // Step 3: Compare hashed passwords
    if (hashedPassword !== credential.hashedPassword) {
      throw new Error('Invalid credentials');
    }

    // Step 4: Generate and encrypt the token
    const payload = { userType, userId }; // Minimal payload
    const publicKey = credential.publicKey; // Assume publicKey is part of the credential or fetched securely

    const jwe = await createAndEncryptToken(payload, publicKey);

    // Step 5: Log success and return the token
    console.log(`User ${email} authenticated successfully. JWE token: ${jwe}`);
    await produceUserDataFetchRequest({
      correlationId,
      userType,
      userId,
    });
    return jwe; // Return the token to the API Gateway or client
  } catch (error) {
    console.error('Error handling login request:', error.message);
    throw error;
  }
}
/**
 * Handle register request
 * @param {Object} msg - { email, password, userType, userData }
 */
async function handleRegisterRequest(msg) {
  const { email, password, userType, userData } = msg;

  try {
    // Step 1: Generate userId
    const userId = uuidv4();

    // Step 2: Call encryption service API to hash the password
    const response = await axios.post(`${process.env.ENCRYPTION_SERVICE_URL}/hash`, {
      password,
    });

    if (response.status !== 200 || !response.data.hashedPassword) {
      throw new Error('Failed to hash password using encryption service');
    }

    const hashedPassword = response.data.hashedPassword;

    // Step 3: Save credentials in Credential collection
    const credential = new Credential({
      userId,
      email,
      userType,
      hashedPassword,
    });

    await credential.save();
    console.log(`Credentials saved for user ${email}`);

    // Step 4: Produce a message for user data saving
    const correlationId = uuidv4();
    const topic = userType === 'charity' ? 'charity-creation' : 'donor-creation';

    await produceUserDataSaveRequest({
      correlationId,
      userType,
      userData: { ...userData, userId, email },
    });

    console.log(`User data save request produced to topic ${topic} for ${email}`);
  } catch (error) {
    console.error('Error handling register request:', error.message);
  }
}
module.exports = { initiateLogin, handleLoginRequest, handleUserDataResponse, handleRegisterRequest };

import Credential from './credential.model.js';
import { produceUserDataSaveRequest, produceUserDataFetchRequest } from './events/producer.js';
import { createAndEncryptToken } from './token.service.js';


/**
 * Handle login request
 * @param {Object} msg - { id, email, password, userType }
 */
async function handleLoginRequest(msg) {
  const { id, email, password, userType } = msg;

  try {
    // Step 1: Fetch the user's credentials
    const credential = await Credential.findOne({ email, userType });
    if (!credential) {
      throw new Error('Invalid credentials');
    }
    const userId = credential.userId;

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
    const payload = { userType, userId }; // Minimal payload for the token
    const publicKey = credential.publicKey; // Ensure this is securely available
    const jwe = await createAndEncryptToken(payload, publicKey);

    // Step 5: Use the passed id as the correlationId
    const correlationId = id;

    // Step 6: Produce event to fetch user data
    await produceUserDataFetchRequest({ correlationId, userType, userId });

    // Step 7: Produce event to API Gateway with the JWE
    await produceLoginSuccess({ correlationId, jwe });

    console.log(`Login request processed successfully for ${email}. Events sent to fetch user data and verify user.`);
  } catch (error) {
    console.error('Error handling login request:', error.message);
    throw error;
  }
}

/**
 * Handle register request
 * @param {Object} msg - { id, email, password, userType, userData }
 */
async function handleRegisterRequest(msg) {
  const { id, email, password, userType, userData } = msg;

  try {
    // Step 0: Check if email has been used
    const emailCheck = await Credential.findOne({ email });
    if (emailCheck) {
      throw new Error('This email has already been used');
    }

    // Step 1: Use the passed id as the userId
    const userId = id;

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

    // Step 4: Use the passed id as the correlationId
    const correlationId = id;

    // Step 5: Produce a message for user data saving
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

export { handleLoginRequest, handleRegisterRequest};

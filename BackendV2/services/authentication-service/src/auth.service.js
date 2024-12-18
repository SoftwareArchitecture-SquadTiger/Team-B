const Credential = require('../models/Credential');
const { produceUserDataSaveRequest , produceUserDataFetchRequest } = require('../events/producer');
const { createAndEncryptToken } = require('./token.service');

// Store pending login requests similar to encryption pending requests
// correlationId -> { email, userType, plainPassword }
const pendingLogins = {};

// correlationId -> { email, userType }
const pendingUserData = {};

async function initiateLogin(email, password, userType) {
  const correlationId = uuidv4();

  // Store the pending login request
  pendingLogins[correlationId] = { email, password, userType };

  // Request hashing of the provided password to compare with stored credentials
  await produceHashRequest({ correlationId, password });
}

async function handleHashResponse(msg) {
  // msg = { correlationId, hashedPassword: "..." }
  const { correlationId, hashedPassword } = msg;
  const pending = pendingLogins[correlationId];
  if (!pending) {
    console.error(`No pending login for correlationId: ${correlationId}`);
    return;
  }

  const { email, userType } = pending;
  delete pendingLogins[correlationId];

  // Compare the hashedPassword returned with the stored password in Credentials DB
  const cred = await Credential.findOne({ email, userType });
  if (!cred || cred.hashedPassword !== hashedPassword) {
    console.error('Invalid credentials');
    // In a real scenario, you'd send a failure response back to the API gateway
    return;
  }

  // Credentials match, now request user data
  const userCorrId = uuidv4();
  pendingUserData[userCorrId] = { email, userType };
  await produceUserDataFetchRequest({ correlationId: userCorrId, email, userType });
}

async function handleUserDataResponse(msg) {
  // msg = { correlationId, userData: {...}, publicKey: "..." }
  const { correlationId, userData, publicKey } = msg;
  const pending = pendingUserData[correlationId];
  if (!pending) {
    console.error(`No pending user data request for correlationId: ${correlationId}`);
    return;
  }

  const { email, userType } = pending;
  delete pendingUserData[correlationId];

  // Now we have userData and the publicKey for encryption.
  // Create token payload
  const payload = { email, userType, ...userData };

  // Create and encrypt token (JWS -> JWE)
  const jwe = await createAndEncryptToken(payload, publicKey);

  // Now we have the JWE token. Produce a message back to API gateway or directly respond.
  // For example, produce a "login-success" topic message:
  // produceLoginSuccess({ email, userType, userData, token: jwe })
  // Or call the API gateway response mechanism directly.
  console.log(`User ${email} logged in successfully. JWE token: ${jwe}`);
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
module.exports = { initiateLogin, handleHashResponse, handleUserDataResponse, handleRegisterRequest };

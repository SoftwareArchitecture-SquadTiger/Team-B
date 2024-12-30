import Credential from './credential.model.js';
import { produceUserDataSaveRequest, produceLoginSuccess, produceRegisterSuccess } from './events/producer.js';
import { createAndEncryptToken } from './token.service.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { handleServiceError } from './errorHandler.js';
/**
 * Handle login request
 * @param {Object} msg - { correlationId, email, password, userType }
 */
async function handleLoginRequest(msg) {
  const {correlationId, data} = msg;
  console.log('Handling login request:', data);
 const {email, password, userType} = data;
  try {
    // Step 1: Fetch the user's credentials
    console.log(email, userType);
    const credential = await Credential.findOne({ email, userType});
    if (!credential) {
      throw new Error('Email not found in the database');
    }
    console.log('Credential:', credential);
    const userId = credential.userId;
    console.log(credential.password);
    // Step 2: Hash the provided password using the encryption service
    const decryptDataResponse = await axios.post(
      `http://192.168.1.4:5001/client-server/keys/decrypt/model/auth/entity/${userId}`,
      {
        encryptedData: credential.password,
      }
    );
    if (decryptDataResponse.status !== 200 || !decryptDataResponse.data.decryptedData) {
      throw new Error('Failed to decrypt password using encryption service');
    }
    
    const decryptedPassword = decryptDataResponse.data.decryptedData;
    console.log(decryptedPassword);
    // Step 3: Compare hashed passwords
    if (password !== decryptedPassword) {
      throw new Error('Invalid credentials');
    }

    // Step 4: Generate and encrypt the token
    const payload = { userType, userId }; // Minimal payload for the token
    const jwe = await createAndEncryptToken(payload, userId);

    // Step 6: Produce event to API Gateway with the JWE
    await produceLoginSuccess({ correlationId: correlationId, JWE:jwe });

    console.log(`Login request processed successfully for ${email}. Events sent to fetch user data and verify user.`);
  } catch (error) {
    await handleServiceError('login-response', correlationId, error.message);
  }
}

/**
 * Handle register request
 * @param {Object} msg - { action, correlationId, data: { email, password, userType, ...userData } }
 */
async function handleRegisterRequest(msg) {
  const { correlationId, data } = msg;
  const { email, password, userType, ...userData } = data; // Extract required fields from the data object

  try {
    // Step 0: Check if email has been used
    const emailCheck = await Credential.findOne({ email });
    if (emailCheck) {
      throw new Error("This email has already been used");
    }

    // Step 1: Generate a new userId
    const userId = uuidv4();

    // Step 2: Call encryption service API to encrypt the password
    const encryptDataResponse = await axios.post(
      `http://192.168.1.4:5001/client-server/keys/encrypt/model/auth/entity/${userId}`,
      {
        data: password, // Send the password for encryption
      }
    );

    if (
      encryptDataResponse.status !== 200 ||
      !encryptDataResponse.data.encryptedData
    ) {
      throw new Error("Failed to encrypt password using encryption service");
    }

    const encryptedPassword = encryptDataResponse.data.encryptedData;

    // Step 3: Save credentials in Credential collection
    const credential = new Credential({
      userId,
      email,
      userType,
      password: encryptedPassword, // Store the encrypted password
    });

    await credential.save();
    console.log(`Credentials saved for user ${email}`);

    // Step 4: Produce a user data save request
    await produceUserDataSaveRequest({
      correlationId, // Correlation ID for tracking
      userType,
      userData: { ...userData, userId, email }, // Include user-specific data and userId
    });

    console.log(`User data save request produced to topic for ${email}`);

    // Step 5: Produce register success response
    produceRegisterSuccess({ correlationId, userId, userType });

  } catch (error) {
    await handleServiceError('register-response', correlationId, error.message);
  }
}

export { handleLoginRequest, handleRegisterRequest};

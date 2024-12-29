import Credential from './credential.model.js';
import { produceUserDataSaveRequest, produceUserDataFetchRequest,produceLoginSuccess } from './events/producer.js';
import { createAndEncryptToken } from './token.service.js';
import axios from 'axios';

/**
 * Handle login request
 * @param {Object} msg - { id, email, password, userType }
 */
async function handleLoginRequest(msg) {
  const {id, email, password, userType } = msg;

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

    // Step 5: Use the passed id as the correlationId
    const correlationId = id;

    // Step 6: Produce event to API Gateway with the JWE
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

    // Step 2: Call encryption service API to encrypt the password
    const encryptDataResponse = await axios.post(
      `http://192.168.1.4:5001/client-server/keys/encrypt/model/auth/entity/${userId}`,
      {
        data: password,
      }
    );

    if (encryptDataResponse.status !== 200 || !encryptDataResponse.data.encryptedData) {
      throw new Error('Failed to encrypt password using encryption service');
    }

    const encryptedPassword = encryptDataResponse.data.encryptedData;

    // Step 3: Save credentials in Credential collection
    const credential = new Credential({
      userId,
      email,
      userType,
      encryptedPassword,
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

import Credential from '../model/credential.model.js';
import { produceLoginResponse, produceRegisterResponse, produceSaveRequest } from '../events/producer.js';
import { createAndEncryptToken } from './token.service.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { handleServiceError } from '../utils/errorHandler.js';
import fs from 'fs';
import forge from 'node-forge';

// Load RSA private key for signing JWS
const privateKeyPath = process.env.RSA_PRIVATE_KEY_PATH;
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

/**
 * Decrypt encrypted credentials using RSA private key.
 * @param {String} encryptedData - The base64-encoded encrypted data.
 * @returns {String} - Decrypted plaintext value.
 * @throws {Error} - If decryption fails.
 */
function decryptCredentials(encryptedData) {
  try {
    const privateDecryptionKey = forge.pki.privateKeyFromPem(privateKey);
    const encryptedBinary = forge.util.decode64(encryptedData);
    const decrypted = privateDecryptionKey.decrypt(encryptedBinary, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return decrypted;
  } catch (error) {
    throw new Error('Failed to decrypt data', error);
  }
}

/**
 * Handle user login request.
 * @param {Object} msg - The message object containing login details.
 * @param {String} msg.correlationId - Unique ID for correlating responses.
 * @param {Object} msg.data - Data object with email, password, and userType.
 * @param {String} msg.data.email - Encrypted email of the user.
 * @param {String} msg.data.password - Encrypted password of the user.
 * @param {String} msg.data.userType - Type of the user (e.g., Admin, Charity, Donor).
 */
async function handleLoginRequest(msg) {
  const { correlationId, data } = msg;
  const { email, password, userType } = data;

  try {
    console.log('Handling login request');
    const decryptedEmail = decryptCredentials(email);
    const decryptedPassword = decryptCredentials(password);

    console.log(`Decrypted Email: ${decryptedEmail}, UserType: ${userType}`);

    const credential = await Credential.findOne({ email: decryptedEmail, userType });
    if (!credential) {
      throw new Error('Email not found or invalid userType');
    }

    console.log('Credential found');

    const isMatch = await bcrypt.compare(decryptedPassword, credential.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    console.log('Password matched successfully');

    const payload = { userType, userId: credential.userId };
    const jwe = await createAndEncryptToken(payload);

    console.log('Generated JWE');

    await produceLoginResponse('success', { correlationId, JWE: jwe });
    console.log(`Login request processed successfully for ${decryptedEmail}`);
  } catch (error) {
    console.error('Error during login:', error.message);
    await handleServiceError('login-response', correlationId, error.message);
  }
}

/**
 * Handle user registration request.
 * @param {Object} msg - The message object containing registration details.
 * @param {String} msg.correlationId - Unique ID for correlating responses.
 * @param {Object} msg.data - Data object with email, password, userType, and user-specific data.
 * @param {String} msg.data.email - Encrypted email of the user.
 * @param {String} msg.data.password - Encrypted password of the user.
 * @param {String} msg.data.userType - Type of the user (e.g., Admin, Charity, Donor).
 * @param {Object} msg.data.userData - Additional data for the user.
 */
async function handleRegisterRequest(msg) {
  const { correlationId, data } = msg;
  const { email, password, userType, ...userData } = data;

  try {
    console.log('Handling register request');
    const decryptedEmail = decryptCredentials(email);

    const emailCheck = await Credential.findOne({ email: decryptedEmail });
    if (emailCheck) {
      throw new Error("This email has already been used");
    }

    const userId = uuidv4();
    const decryptedPassword = decryptCredentials(password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(decryptedPassword, saltRounds);

    if (userType === 'Admin') {
      console.log('Registering Admin account');

      const adminCredential = new Credential({
        userId,
        email: decryptedEmail,
        userType: 'Admin',
        password: hashedPassword,
      });
      await adminCredential.save();

      console.log(`Admin credentials saved for email ${decryptedEmail}`);
      await produceRegisterResponse('success', { correlationId, userId, userType });
      return;
    }

    const topic = userType === 'Charity' ? 'charity-request' : 'donor-request';
    console.log(`Topic determined: ${topic}`);

    const saveRequest = {
      correlationId,
      userData: {
        ...userData,
        email: decryptedEmail,
      },
    };

    const result = await produceSaveRequest(topic, saveRequest);
    console.log("Response from save request");

    const extractedId = topic === 'charity-request'
      ? result.data?.charity_id
      : result.data?.donor_id;

    if (!extractedId) {
      throw new Error("Failed to extract user ID from response");
    }

    const credential = new Credential({
      userId: extractedId,
      email: decryptedEmail,
      userType,
      password: hashedPassword,
    });
    await credential.save();

    console.log(`Credentials saved for user: ${decryptedEmail}`);
    await produceRegisterResponse('success', { correlationId, userType });
  } catch (error) {
    console.error('Error during registration:', error.message);
    await handleServiceError('register-response', correlationId, error.message);
  }
}

export { handleLoginRequest, handleRegisterRequest };
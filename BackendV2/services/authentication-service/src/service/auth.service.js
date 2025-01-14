import Credential from '../model/credential.model.js';
import {produceLoginResponse, produceRegisterResponse, produceSaveRequest } from '../events/producer.js';
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
    return decrypted; // Decrypted value (username, password, etc.)
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
  console.log('Handling login request:', data);
  const { email, password, userType } = data;

  try {
    //Decryption
    const decryptedEmail = decryptCredentials(email); 
    const decryptedPassword = decryptCredentials(password); 
    console.log(`Decrypted Email: ${decryptedEmail}, UserType: ${userType}`);

    const credential = await Credential.findOne({ email: decryptedEmail, userType });
    if (!credential) {
      throw new Error('Email not found or invalid userType');
    }
    console.log('Credential found:', credential);
    
    //Password validation
    const isMatch = await bcrypt.compare(decryptedPassword, credential.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const payload = { userType, userId: credential.userId }; 
    const jwe = await createAndEncryptToken(payload);
    console.log('JWE:', jwe);

    //Send success message
    await produceLoginResponse('success', { correlationId, JWE: jwe });

    console.log(`Login request processed successfully for ${decryptedEmail}`);
  } catch (error) {
    console.log('Error during login:', error.message);
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
    const decryptedEmail = decryptCredentials(email); 

    const emailCheck = await Credential.findOne({ decryptedEmail });
    if (emailCheck) {
      throw new Error("This email has already been used");
    }

    const userId = uuidv4();

    const decryptedPassword = decryptCredentials(password); 

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(decryptedPassword, saltRounds);
    
    // Handle admin case
    if (userType === 'Admin') {
      console.log('Registering Admin account');

      // Store password
      const adminCredential = new Credential({
        userId,
        email: decryptedEmail,
        userType: 'Admin',
        password: hashedPassword, 
      });
      await adminCredential.save();
      console.log(`Admin credentials saved for email ${decryptedEmail}`);

      // Produce a register success response for Admin
      produceRegisterResponse('success', { correlationId, userId, userType });
      return; 
    }
    const topic = userType === 'Charity' ? 'charity-request' : 'donor-request';

    const saveRequest = {
      correlationId,
      userData: {
        ...userData,
        email: decryptedEmail,
      },
    };

    const result = await produceSaveRequest(topic, saveRequest);
    let extractedId;
    if (result.data) {
      // Extract based on the topic
      if (topic === 'charity-request') {
          extractedId = result.data.charity_id; 
      } else {
          extractedId = result.data.donor_id; 
      }
  } else {
      throw new Error("No data property found in the result object");
  }
    console.log(extractedId);

    const credential = new Credential({
      userId: extractedId,
      email: decryptedEmail,
      userType,
      password: hashedPassword,
    });
    await credential.save();
    console.log(`Credentials saved for user ${email}`);
    produceRegisterResponse('success',{ correlationId, userType });

  } catch (error) {
    await handleServiceError('register-response', correlationId, error.message);
  }
}

export { handleLoginRequest, handleRegisterRequest};

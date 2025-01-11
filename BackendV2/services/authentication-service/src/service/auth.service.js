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
 * Handle login request
 * @param {Object} msg - { correlationId, email, password, userType }
 */
async function handleLoginRequest(msg) {
  const { correlationId, data } = msg;
  console.log('Handling login request:', data);
  const { email, password, userType } = data;

  try {
    // Step 1: Check if the userType is Admin
    if (userType === 'Admin') {
          // Step 1: Decrypt the email and password
    const decryptedEmail = decryptCredentials(email); // Decrypts the email
    const decryptedPassword = decryptCredentials(password); // Decrypts the password
    console.log(decryptedPassword);
    console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
      if (email !== process.env.ADMIN_USERNAME || decryptedPassword !== process.env.ADMIN_PASSWORD) {
        throw new Error('Invalid admin credentials');
      }
      console.log('Admin credentials are correct');

      // Create token for Admin
      const payload = { userType, userId: 'admin' }; // Assign a static userId for Admin
      const jwe = await createAndEncryptToken(payload);
      console.log('JWE:', jwe);

      // Produce login response for Admin
      await produceLoginResponse('success', { correlationId, JWE: jwe });
      console.log(`Login request processed successfully for Admin: ${decryptedEmail}`);
      return; // Exit early since Admin login is complete
    }

    // Step 2: Fetch the user's credentials for non-admin users
    const decryptedEmail = decryptCredentials(email); // Decrypts the email
    console.log(decryptedEmail, userType);
    const credential = await Credential.findOne({ decryptedEmail, userType });
    if (!credential) {
      throw new Error('Email not found in the database');
    }
    console.log('Credential:', credential);
    const userId = credential.userId;

    // Step 3: Decrypt the incoming password
    const decryptedPassword = decryptCredentials(password); // Decrypts the password sent from the frontend
    console.log(decryptedPassword);

    // Step 4: Compare hashed passwords for non-admin users
    const isMatch = await bcrypt.compare(decryptedPassword, credential.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Step 5: Generate and encrypt the token
    const payload = { userType, userId }; // Minimal payload for the token
    const jwe = await createAndEncryptToken(payload);
    console.log('JWE:', jwe);

    // Step 6: Produce event to API Gateway with the JWE
    await produceLoginResponse('success', { correlationId, JWE: jwe });

    console.log(`Login request processed successfully for ${email}. Events sent to fetch user data and verify user.`);
  } catch (error) {
    console.log('Error:', error.message);
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
    const decryptedEmail = decryptCredentials(email); // Decrypts the email

    // Step 1: Check if email has been used
    const emailCheck = await Credential.findOne({ decryptedEmail });
    if (emailCheck) {
      throw new Error("This email has already been used");
    }

    // Step 2: Generate a new userId
    const userId = uuidv4();

    // Step 3: Decrypt the incoming password
    const decryptedPassword = decryptCredentials(password); // Decrypts the password sent from the frontend
    console.log(decryptDataResponse);

    // Step 4: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(decryptedPassword, saltRounds);
    console.log('Hashed password:', hashedPassword);

    // Step 5: Produce save request and wait for response
    const saveRequest = {
      correlationId,
      userData: { ...userData, userId, email: decryptedEmail },
    };
    const topic = userType === 'Charity' ? 'charity-request' : 'donor-request';
    console.log(topic);
    const result = await produceSaveRequest(topic, saveRequest);
    const {status} = result;
    if (status === 'error') {
      throw new Error("Failed to save user data");
    }
    // Step 4: Save credentials in Credential collection
    const credential = new Credential({
      userId,
      email: decryptedEmail,
      userType,
      password: hashedPassword, // Store the encrypted password
    });
    await credential.save();
    console.log(`Credentials saved for user ${email}`);

    // Step 5: Produce register success response
    produceRegisterResponse('success',{ correlationId, userId, userType });

  } catch (error) {
    await handleServiceError('register-response', correlationId, error.message);
  }
}

export { handleLoginRequest, handleRegisterRequest};

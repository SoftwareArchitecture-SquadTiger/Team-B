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
    // Step 1: Decrypt the email and password
    const decryptedEmail = decryptCredentials(email); // Decrypts the email
    const decryptedPassword = decryptCredentials(password); // Decrypts the password
    console.log(`Decrypted Email: ${decryptedEmail}, UserType: ${userType}`);

    // Step 2: Fetch the user's credentials based on email and userType
    const credential = await Credential.findOne({ email: decryptedEmail, userType });
    if (!credential) {
      throw new Error('Email not found or invalid userType');
    }

    console.log('Credential found:', credential);

    // Step 3: Compare hashed passwords
    const isMatch = await bcrypt.compare(decryptedPassword, credential.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    console.log('Password matched successfully');

    // Step 4: Generate and encrypt the token
    const payload = { userType, userId: credential.userId }; // Minimal payload for the token
    const jwe = await createAndEncryptToken(payload);
    console.log('JWE:', jwe);

    // Step 5: Produce login response
    await produceLoginResponse('success', { correlationId, JWE: jwe });

    console.log(`Login request processed successfully for ${decryptedEmail}`);
  } catch (error) {
    console.log('Error during login:', error.message);
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

    // Step 4: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(decryptedPassword, saltRounds);
    if (userType === 'Admin') {
      // Handle admin account registration
      console.log('Registering Admin account');

      // Step 5: Save admin credentials in the Credential collection
      const adminCredential = new Credential({
        userId,
        email: decryptedEmail,
        userType: 'Admin',
        password: hashedPassword, // Store the hashed password
      });
      await adminCredential.save();
      console.log(`Admin credentials saved for email ${decryptedEmail}`);

      // Step 6: Produce a register success response for Admin
      produceRegisterResponse('success', { correlationId, userId, userType });
      return; // Exit early as Admin registration is complete
    }
    const topic = userType === 'Charity' ? 'charity-request' : 'donor-request';
    console.log(topic);
// Step 5: Produce save request and wait for response
const saveRequest = {
  correlationId,
  userData: {
    ...userData,
    email: decryptedEmail,
  },
};

    const result = await produceSaveRequest(topic, saveRequest);
    console.log("Full Result Data:", result);
    let extractedId;
    if (result.data) {
      // Extract based on the topic
      if (topic === 'charity-request') {
          extractedId = result.data.charity_id; // Use `charity_id` if topic is 'charity-request'
      } else {
          extractedId = result.data.donor_id; // Use `donor_id` otherwise
      }
  } else {
      throw new Error("No data property found in the result object");
  }
    console.log(extractedId);
    // Step 4: Save credentials in Credential collection
    const credential = new Credential({
      userId: extractedId,
      email: decryptedEmail,
      userType,
      password: hashedPassword, // Store the encrypted password
    });
    await credential.save();
    console.log(`Credentials saved for user ${email}`);

    // Step 5: Produce register success response
    produceRegisterResponse('success',{ correlationId, userType });

  } catch (error) {
    await handleServiceError('register-response', correlationId, error.message);
  }
}

export { handleLoginRequest, handleRegisterRequest};

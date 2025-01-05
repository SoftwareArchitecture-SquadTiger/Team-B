import Credential from '../model/credential.model.js';
import {produceLoginResponse, produceRegisterResponse, produceSaveRequest } from '../events/producer.js';
import { createAndEncryptToken } from './token.service.js';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import { handleServiceError } from '../utils/errorHandler.js';

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDET4/xzmQ4KU0t
z7I5U1UCesCWuq9dIhbR7GYXBqzsOmcAQdfNI1s6OlrRDrWf8Y1EFBPLehNA6HhA
dtMatjde2S336vcplGHEwKnKD98eGMmDo5P4DX4L25Nm9hIuVbb1h7M6xb7Uv3Xc
5TQ9MdCvYVC05MUwki3zO6tg/0JObp4yjYn3LbCeRcMm9w79WXSuInToB5BHP0ur
vKgWvs6Endehhr3SZCeeBG3EmOAo80hj4PSsp00pJf/kCNh4h2Jk1KEET33VDuDd
QhwexUuo5EQVWly15dIuh1im9JKITSAEVWQAgbbtLtXiLaU6goFFQITYvbnMpY3y
TmhD8GRPAgMBAAECggEAQM5PI7FRzmR8EQqGuHv1DVt+poO8jo9JX0WeMi3G+jkR
dblGx3bLj/5hqrAjb0irrPS/0CVdo8jaodVYPXI39zzU+wn7TCOq3uwHYSg6LNJb
+/QNTg8ONFXpZE0JlXhAbO++UEGljNAj1adoxmbikHMc1IrNOgqX1rs1CVFbD07J
89ROiS3FB8ev22pX6/dMtp5MRHdrILvxriWIC03TnT4P2IGXd90rhdOVX324MZEn
6b05mf6mYF6r6XG24Z7wtsZQC1EqePh2x5t5pxfp8/9JGzvvubMTgvZL2TEegNEB
OdS8+oClkl7ufZORjjJIbJpVZmT7RWE/LSwTE4e7OQKBgQD/JWislDrGWZX9TLcv
ggDK3+A5vTVtHX0SQMQnlMiCcEmNSWoPt+psfmlCvn7zbPsEdKE8Ei7LZsRvn3vy
jzvER0GlE/psSlzkTLT/R7OX83cwpa6Kjm0Z/zGftM3AoqQzHpO4NQ3hIHEZqFw5
qF+ikynWMcIeHu9jbx+BakPg0wKBgQDE979ZEVjc7SbcebRNc3mY8fIpJh17FwbW
S1/9A1eWIKOakynr0TlDDqwcL00zEHZ6l0h8LuKSE4p3PYOtNISQec9AB0X7/ivO
lP9Oh9e4p+L8wjcms/aa1uNKdVpOuIYmDR/Qaf27eMtPGVAfekiPvM/XB1HrbTGW
DgBQRbVhFQKBgQDLi9F81GgrMu74e4osiV8OehnMlkiX+w17UVXracOoY+IZp/bI
AWYwFYzt5UEr+8YpoM28OZlBRYPytN3R/Til9l7FTjHa0FxY+WTvvwjkcSOmGJct
DEC3m6HAEiKOynGKIpugOhsPfa0c1fZ1PQDGlvaqXVnKY82AmvccbGUoZwKBgBJy
ia9T2pjGdU9M7sAaQpc6gc2szjILFA7Z/GF8AKYE5I3DnreBXvWS2DfDjl1r+0y8
AoPu+DVqMxu73StJsei+H9UFWV6ijYPJnKfEPUYEI1Q89GFhlYUm/x6oIw8gZSAH
NqWUZ7k5NQFxg3mPQGCF9IlVHC0Kiwxcv1bFUJmJAoGBAK4Khs57V+2jMup4ZrUX
gLpS7bi8P/4M+vE1+SyA7XAI50kzN5iO6MaWb/2bKsw5ZE/xFlXE0p5FLGQYCXQM
nt1fXW/2wB5pIgsHqyHdpNPaRXDlTsSiAL7XDpqaR4w6bXagHq8V1/+tjObrUeal
0EbGVgf1f/rT+iVD96GkPwa7
-----END PRIVATE KEY-----`;

function decryptPassword(encryptedPassword) {
  try {
    const rsa = new NodeRSA(privateKey);
    return rsa.decrypt(encryptedPassword, 'utf8'); // Decrypts to plain text
  } catch (error) {
    throw new Error('Failed to decrypt password');
  }
}


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

    // Step 2: Decrypt the incoming password
    const decryptedPassword = decryptPassword(password); // Decrypts the password sent from the frontend
    console.log(decryptDataResponse);
    if (decryptDataResponse.status !== 200 || !decryptDataResponse.data.decryptedData) {
      throw new Error('Failed to decrypt password using encryption service');
    }
    
    console.log(decryptedPassword);
    // Step 3: Compare hashed passwords
    const isMatch = await bcrypt.compare(decryptedPassword, credential.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    // Step 4: Generate and encrypt the token
    const payload = { userType, userId }; // Minimal payload for the token
    const jwe = await createAndEncryptToken(payload, userId);
    console.log('JWE:', jwe);

    // Step 5: Produce event to API Gateway with the JWE
    await produceLoginResponse('success',{ correlationId: correlationId, JWE:jwe });

    console.log(`Login request processed successfully for ${email}. Events sent to fetch user data and verify user.`);
  } catch (error) {
    console.log('Error:', error);
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
    // Step 1: Check if email has been used
    const emailCheck = await Credential.findOne({ email });
    if (emailCheck) {
      throw new Error("This email has already been used");
    }

    // Step 2: Generate a new userId
    const userId = uuidv4();

    // Step 3: Decrypt the incoming password
    const decryptedPassword = decryptPassword(password); // Decrypts the password sent from the frontend
    console.log(decryptDataResponse);

    // Step 4: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(decryptedPassword, saltRounds);
    console.log('Hashed password:', hashedPassword);

    // Step 5: Produce save request and wait for response
    const saveRequest = {
      correlationId,
      userData: { ...userData, userId, email },
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
      email,
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

import { v4 as uuidv4 } from 'uuid';
import { SignJWT, importPKCS8 } from 'jose';
import axios from 'axios';
import fs from 'fs';

// Load RSA key for JWS signing
const privateKeyPath = process.env.JWS_PRIVATE_KEY_PATH;
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

// Define privateKeyObject
let privateKeyObject;

// Import private key asynchronously
(async () => {
  privateKeyObject = await importPKCS8(privateKeyPem, 'RS256');
  console.log('Private key loaded successfully');
})();

/**
 * createAndEncryptToken:
 * 1. Sign the payload as JWS locally using JOSE.
 * 2. Make a POST request to encrypt the JWS using the encryption service.
 * 3. Return the JWE response from the encryption service.
 */
export async function createAndEncryptToken(payload, entityId) {
  if (!privateKeyObject) {
    throw new Error('Private key not yet loaded for JWS signing.');
  }

  // Step 1: Sign the payload locally as JWS
  const jws = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKeyObject);

  // Step 2: Call the encryption service via REST API to encrypt the JWS
  try {
    const model = 'auth'; // Replace with your specific model name
    const entityId = uuidv4(); // Generate or pass the entity ID dynamically

    const response = await axios.post(
      `${process.env.ENCRYPTION_SERVICE_URL}/encrypt`,
      {
        jws: jws, // Send the signed JWS as 'data'
        entityId: entityId, // Pass the entity ID for encryption
      }
    );

    if (response.status === 200 && response.data && response.data.encryptedToken) {
      return response.data.encryptedToken; // Return the encrypted JWE token
    } else {
      throw new Error('Invalid response from encryption service');
    }
  } catch (err) {
    throw new Error(`Failed to call encryption service: ${err.message}`);
  }
}

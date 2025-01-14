import { EncryptJWT, importSPKI } from 'jose';
import fs from 'fs';

// Load public key for JWE encryption
const publicKeyPath = process.env.JWE_PUBLIC_KEY_PATH;
const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8');

// Public key object for encryption
let publicKeyObject;

/**
 * Load and import the public key asynchronously at startup.
 */
(async () => {
  try {
    publicKeyObject = await importSPKI(publicKeyPem, 'RSA-OAEP');
    console.log('Public key loaded successfully for JWE encryption.');
  } catch (error) {
    console.error('Error loading public key:', error.message);
    throw new Error('Failed to load public key for JWE encryption.');
  }
})();

/**
 * Create, sign, and encrypt a JWT (JWE).
 * - Signs the payload as JWS using JOSE.
 * - Encrypts the signed JWS into a JWE using JOSE.
 *
 * @param {Object} payload - The payload to include in the JWT.
 * @param {string} payload.userType - The type of the user (e.g., "Admin", "User").
 * @param {string} payload.userId - The unique ID of the user.
 * @returns {Promise<string>} - The encrypted JWE token.
 * @throws {Error} - If the public key is not loaded or encryption fails.
 */
export async function createAndEncryptToken(payload) {
  try {
    if (!publicKeyObject) {
      throw new Error('Public key is not yet loaded for JWE encryption.');
    }

    // Create and encrypt the JWE
    const jwe = await new EncryptJWT(payload)
      .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .encrypt(publicKeyObject);

    return jwe;
  } catch (error) {
    console.error('Error creating and encrypting JWE:', error.message);
    throw new Error('Failed to create and encrypt the token.');
  }
}

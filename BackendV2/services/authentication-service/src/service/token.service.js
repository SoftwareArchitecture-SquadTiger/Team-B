import { EncryptJWT, importSPKI } from 'jose';
import fs from 'fs';

// Load public key for JWE encryption
const publicKeyPath = process.env.JWE_PUBLIC_KEY_PATH;
const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8');

// Define key
let publicKeyObject;

// Import keys asynchronously
(async () => {
  publicKeyObject = await importSPKI(publicKeyPem, 'RSA-OAEP');
  console.log('Keys loaded successfully');
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
  if (!publicKeyObject) {
    throw new Error('Public key not yet loaded for JWE encryption.');
  }

  // Encrypt the payload directly as a JWE
  const jwe = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('1h') // Set expiration time for the token
    .encrypt(publicKeyObject);

  return jwe;
}

import { EncryptJWT, importSPKI } from 'jose';
import fs from 'fs';

// Load public key for JWE encryption
const publicKeyPath = process.env.JWE_PUBLIC_KEY_PATH;
const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8');

// Define privateKeyObject and publicKeyObject
let publicKeyObject;

// Import private and public keys asynchronously
(async () => {
  // Import the private key for signing JWS
  // Import the public key for encrypting JWE
  publicKeyObject = await importSPKI(publicKeyPem, 'RSA-OAEP');
  console.log('Keys loaded successfully');
})();

/**
 * Create, Sign, and Encrypt a JWT (JWE).
 * 1. Sign the payload as JWS using JOSE.
 * 2. Encrypt the signed JWS into a JWE using JOSE.
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

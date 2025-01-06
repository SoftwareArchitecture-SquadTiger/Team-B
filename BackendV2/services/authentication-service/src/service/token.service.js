import { SignJWT, EncryptJWT, importPKCS8, importSPKI } from 'jose';
import fs from 'fs';

// Load RSA private key for signing JWS
const privateKeyPath = process.env.JWS_PRIVATE_KEY_PATH;
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

// Load public key for JWE encryption
const publicKeyPath = process.env.JWE_PUBLIC_KEY_PATH;
const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8');

// Define privateKeyObject and publicKeyObject
let privateKeyObject, publicKeyObject;

// Import private and public keys asynchronously
(async () => {
  // Import the private key for signing JWS
  privateKeyObject = await importPKCS8(privateKeyPem, 'RS256');

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
  const { userId, role } = payload;

  if (!privateKeyObject || !publicKeyObject) {
    throw new Error('Keys not yet loaded for JWT processing.');
  }

  // Step 1: Sign the payload locally as JWS
  const jws = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKeyObject);

  // Step 2: Encrypt the JWS as a JWE
  const jwe = await new EncryptJWT({ jws })
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
    .encrypt(publicKeyObject);

  return jwe;
}

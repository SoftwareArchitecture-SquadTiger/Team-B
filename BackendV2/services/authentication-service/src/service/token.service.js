import { SignJWT, importPKCS8, generateKeyPair, compactEncrypt } from 'jose';
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
  privateKeyObject = await importPKCS8(privateKeyPem, 'RS256');
  publicKeyObject = await generateKeyPair('RSA-OAEP', { modulusLength: 2048 }); // If you generate locally
  console.log('Keys loaded successfully');
})();

/**
 * Create, Sign, and Encrypt a JWT (JWE).
 * 1. Sign the payload as JWS using JOSE.
 * 2. Encrypt the signed JWS into a JWE using JOSE.
 */
export async function createAndEncryptToken(payload, entityId) {
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
  const encoder = new TextEncoder();
  const jwe = await new compactEncrypt(encoder.encode(jws))
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
    .encrypt(publicKeyObject.publicKey);

  return jwe; // Return the JWE
}

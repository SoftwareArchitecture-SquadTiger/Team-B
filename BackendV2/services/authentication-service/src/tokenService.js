const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { SignJWT, importPKCS8 } = require('jose');
const { produceEncryptRequest } = require('../events/producer');

// Generate or load RSA key for JWS signing
const privateKeyPem = fs.readFileSync(path.join(__dirname, '../keys/jws_private.pem'), 'utf8');
let privateKeyObject;
const pendingEncryptions = {};

// Import private key asynchronously
(async () => {
  privateKeyObject = await importPKCS8(privateKeyPem, 'RS256');
})();

/**
 * createAndEncryptToken:
 * 1. Sign the payload as JWS locally using JOSE.
 * 2. Produce 'encrypt-request' to the Encryption Module for JWE.
 * 3. Return a promise that resolves to JWE once 'encrypt-response' arrives.
 */
async function createAndEncryptToken(payload, publicKey) {
  if (!privateKeyObject) {
    throw new Error('Private key not yet loaded for JWS signing.');
  }

  const jws = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKeyObject);

  const correlationId = uuidv4();

  return new Promise((resolve, reject) => {
    pendingEncryptions[correlationId] = { resolve, reject };
    produceEncryptRequest({ correlationId, jws, publicKey })
      .catch(err => {
        delete pendingEncryptions[correlationId];
        reject(new Error('Failed to produce encrypt-request: ' + err.message));
      });
  });
}

/**
 * handleEncryptResponse:
 * Called by the consumer when an `encrypt-response` arrives.
 */
function handleEncryptResponse(msg) {
  const { correlationId, jwe } = msg;
  const pending = pendingEncryptions[correlationId];
  if (!pending) {
    console.error(`No pending encryption request for correlationId: ${correlationId}`);
    return;
  }

  pending.resolve(jwe);
  delete pendingEncryptions[correlationId];
}

module.exports = { createAndEncryptToken, handleEncryptResponse };

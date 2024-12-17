import { v4 as uuidv4 } from 'uuid';
import { produceHashRequest, produceEncryptRequest, produceDecryptRequest } from '../events/producer.js';

// Pending requests maps
const pendingHashRequests = {};
const pendingEncryptRequests = {};
const pendingDecryptRequests = {};

function handleHashResponse({ correlationId, hashedPassword }) {
  const pending = pendingHashRequests[correlationId];
  if (!pending) {
    console.error(`No pending hash request for correlationId: ${correlationId}`);
    return;
  }
  pending.resolve(hashedPassword);
  delete pendingHashRequests[correlationId];
}

function handleEncryptResponse({ correlationId, jwe }) {
  const pending = pendingEncryptRequests[correlationId];
  if (!pending) {
    console.error(`No pending encrypt request for correlationId: ${correlationId}`);
    return;
  }
  pending.resolve(jwe);
  delete pendingEncryptRequests[correlationId];
}

function handleDecryptResponse({ correlationId, plaintext }) {
  const pending = pendingDecryptRequests[correlationId];
  if (!pending) {
    console.error(`No pending decrypt request for correlationId: ${correlationId}`);
    return;
  }
  pending.resolve(plaintext);
  delete pendingDecryptRequests[correlationId];
}

async function hashPassword(password) {
  const correlationId = uuidv4();
  return new Promise((resolve, reject) => {
    pendingHashRequests[correlationId] = { resolve, reject };
    produceHashRequest({ correlationId, password }).catch(err => {
      delete pendingHashRequests[correlationId];
      reject(err);
    });
  });
}

async function encryptField(plaintext, publicKey) {
  const correlationId = uuidv4();
  return new Promise((resolve, reject) => {
    pendingEncryptRequests[correlationId] = { resolve, reject };
    produceEncryptRequest({ correlationId, payload: { data: plaintext }, publicKey }).catch(err => {
      delete pendingEncryptRequests[correlationId];
      reject(err);
    });
  });
}

async function decryptField(jwe, privateKey) {
  const correlationId = uuidv4();
  return new Promise((resolve, reject) => {
    pendingDecryptRequests[correlationId] = { resolve, reject };
    produceDecryptRequest({ correlationId, jwe, privateKey }).catch(err => {
      delete pendingDecryptRequests[correlationId];
      reject(err);
    });
  });
}

async function createCharity(data, publicKey) {
  data.charity_id = uuidv4();
  data.password = await hashPassword(data.password);

  // Suppose we also want to encrypt `tax_code`
  if (data.tax_code) {
    data.tax_code = await encryptField(data.tax_code, publicKey);
  }

  // Save charity to DB
  // ... code to save charity (omitted for brevity)

  // Produce a charity-creation event if needed
  // await produceCharityCreation({ charityId: data.charity_id, email: data.email, name: data.name });

  return data; // return created charity object
}

async function authenticateCharity(email, password) {
  // Load charity from DB
  const charity = await Charity.findOne({ email });
  if (!charity) throw new Error('Invalid credentials');

  // Hash the provided password
  const hashedInputPassword = await hashPassword(password);

  if (hashedInputPassword !== charity.password) {
    throw new Error('Invalid credentials');
  }

  return charity;
}

async function getCharityById(id, privateKey) {
  const charity = await Charity.findOne({ charity_id: id });
  if (!charity) return null;

  if (charity.tax_code) {
    charity.tax_code = await decryptField(charity.tax_code, privateKey);
  }

  return charity;
}

export {
  createCharity,
  authenticateCharity,
  getCharityById,
  handleHashResponse,
  handleEncryptResponse,
  handleDecryptResponse
};

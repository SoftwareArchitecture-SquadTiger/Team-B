const { Charity } = require('../models');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const BCRYPT_SERVICE_URL = process.env.BCRYPT_SERVICE_URL;
const JWE_SERVICE_URL = process.env.JWE_SERVICE_URL;
const { getPublicKey, getPrivateKey } = require('./keyService');

async function hashPassword(password) {
  const response = await axios.post(`${BCRYPT_SERVICE_URL}/hash`, { password });
  return response.data.hashed;
}

async function encryptField(plaintext) {
  const response = await axios.post(`${JWE_SERVICE_URL}/encrypt`, {
    payload: { data: plaintext },
    publicKey: getPublicKey()
  });
  return response.data.jwe;
}

async function decryptField(jwe) {
  const response = await axios.post(`${JWE_SERVICE_URL}/decrypt`, {
    jwe,
    privateKey: getPrivateKey()
  });
  return response.data.payload.data;
}

async function createCharity(data) {
  data.charity_id = uuidv4();
  data.password = await hashPassword(data.password);

  // Suppose we also want to encrypt the `tax_code` before storing it
  if (data.tax_code) {
    data.tax_code = await encryptField(data.tax_code);
  }

  const charity = new Charity(data);
  await charity.save();
  return charity;
}

async function authenticateCharity(email, password) {
  const charity = await Charity.findOne({ email });
  if (!charity) throw new Error('Invalid credentials');

  const response = await axios.post(`${BCRYPT_SERVICE_URL}/verify`, {
    password,
    hash: charity.password
  });

  if (!response.data.match) throw new Error('Invalid credentials');
  return charity;
}

// If you need to read encrypted fields back:
async function getCharityById(id) {
  const charity = await Charity.findOne({ charity_id: id });
  if (!charity) return null;
  
  // Decrypt fields as needed
  if (charity.tax_code) {
    charity.tax_code = await decryptField(charity.tax_code);
  }

  return charity;
}

module.exports = {
  createCharity,
  authenticateCharity,
  getCharityById
};

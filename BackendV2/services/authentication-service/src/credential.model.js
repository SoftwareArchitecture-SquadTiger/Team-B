import { getDbConnection } from './dbConnection.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'charityDB' connection
const credentialDb = getDbConnection("credentialDB", clusterURI);

const credentialSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true },
    userType: { type: String, required: true },
    hashedPassword: { type: String, required: true } // received from encryption service
});

const Credential = credentialDb.model("Credential", credentialSchema);
export default Credential;

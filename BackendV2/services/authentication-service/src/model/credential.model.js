import { getDbConnection } from '../dbConnection.js';
import mongoose from 'mongoose';
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

const credentialDb = getDbConnection("authenticationDB", clusterURI);

const credentialSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true } 
},
 {
    timestamps: true
});

const Credential = credentialDb.model("Credential", credentialSchema);
export default Credential;

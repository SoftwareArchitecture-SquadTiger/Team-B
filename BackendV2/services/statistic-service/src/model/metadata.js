import mongoose from 'mongoose';
import { getDbConnection } from '../utils/dbConnection.js';
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'statsDB' connection
const statsDb = getDbConnection("statsDB", clusterURI);

const MetadataSchema = new mongoose.Schema({
  key: { type: String, unique: true }, // 'donation_last_update' or 'charity_last_update'
  value: { type: Date, default: Date.now }, // Timestamp of the last update
});

const Metadata = statsDb.model('Metadata', MetadataSchema);
export default Metadata;

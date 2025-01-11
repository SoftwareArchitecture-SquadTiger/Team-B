import mongoose from 'mongoose';
import { getDbConnection } from '../utils/dbConnection.js';
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'statsDB' connection
const statsDb = getDbConnection("statsDB", clusterURI);

const DonationSchema = new mongoose.Schema({
    donation_id: { type: String, unique: true },
    donor_id: String,
    project_id: String,
    amount: Number,
    currency: String,
    payment_method: String,
    message: String,
    status: String,
    is_recurring: Boolean,
    createdAt: Date,
    updatedAt: Date,
  });
  
  const Donation = statsDb.model('Donation', DonationSchema);
  export default Donation;
  
import mongoose from 'mongoose';
import { getDbConnection } from '../utils/dbConnection.js';
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'statsDB' connection
const statsDb = getDbConnection("statsDB", clusterURI);

const CharitySchema = new mongoose.Schema({
  charity_id: { type: String, unique: true },
  category_id: String,
  title: String,
  current_amount: Number,
  target_amount: Number,
  description: String,
  status: String,
  start_date: Date,
  end_date: Date,
  region: String,
  country: String,
  images: Array,
  videos: Array,
  project_id: String,
});

const Charity = statsDb.model('Charity', CharitySchema);
export default Charity;

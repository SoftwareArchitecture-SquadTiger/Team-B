import mongoose from 'mongoose';
import { getDbConnection } from '../utils/dbConnection.js';
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'statsDB' connection
const statsDb = getDbConnection("statsDB", clusterURI);

const ProjectSchema = new mongoose.Schema({
  project_id: { type: String, unique: true },
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
  related_charity_id: String, // If projects are related to charities
});

const Project = statsDb.model('Project', ProjectSchema);
export default Project;

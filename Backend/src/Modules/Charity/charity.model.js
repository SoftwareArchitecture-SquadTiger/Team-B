import { getDbConnection } from '../../Config/dbConnections.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get 'charityDB' connection
const charityDb = getDbConnection("charityDB", clusterURI);

const charitySchema = new mongoose.Schema(
  {
    charity_id: {
      type: String,
      default: uuidv4, // Generate UUID
      unique: true,
      immutable: true,
    },
    user_id: {
      type: String,
      required: true, // Ownership
    },
    organization_name: {
      type: String,
      required: true,
      trim: true,
    },
    organization_type: {
      type: String,
      required: true,
      enum: ['Individual', 'Company', 'Non-Profit'], 
    },
    tax_code: {
      type: String,
      required: true, 
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: null, 
    },
    credit_card_info: {
      type: String,
      required: false, 
      select: false, 
    },
  },
  {
    timestamps: true, 
  }
);

const Charity = charityDb.model("Charity", charitySchema);

export default Charity;
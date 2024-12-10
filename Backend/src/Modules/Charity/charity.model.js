import { getDbConnection } from '../../Config/dbConnection.js';
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
      default: uuidv4, // Automatically generate a UUID
      unique: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true, 
      trim: true,
      unique: true, 
    },
    phone: {
      type: String,
      required: true, 
      trim: true,
    },
    type: {
      type: String,
      required: true, 
      enum: ["Individual", "Company", "Non-Profit"],
    },
    address: {
      type: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        zip: { type: String, required: true, trim: true },
      },
      required: true, 
    },
    country: {
      type: String,
      required: true, 
      trim: true,
    },
    password: {
      type: String,
      required: true, 
      minlength: 8, 
      select: false, 
    },
    tax_code: {
      type: String,
      required: true, 
      trim: true,
    },
    img_url: {
      type: String,
      default: null, 
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Charity = charityDb.model("Charity", charitySchema);

export default Charity;
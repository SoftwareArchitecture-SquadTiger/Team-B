import { getDbConnection } from "../utils/dbConnection.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const clusterURI = process.env.MONGO_URI;

// Get the connection for the `donorDB`
const donorDb = getDbConnection("donorDB", clusterURI);

const donorSchema = new mongoose.Schema(
  {
    donor_id: {
      type: String,
      default: uuidv4, // Generate UUID
      unique: true,
      immutable: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
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
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postal_code: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    img_url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJson: {
      virtuals: true, 
      transform: (doc, ret) => {
        delete ret.__v; 
        return ret; 
      },
    },
  }
);

const Donor = donorDb.model("Donor", donorSchema);

export default Donor;

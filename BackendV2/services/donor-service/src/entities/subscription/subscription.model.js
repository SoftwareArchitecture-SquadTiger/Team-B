import { donorDb } from "../donor/donor.model.js";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    categories: [{ type: String, trim: true }],
    regions: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
    collection: "subscriptions",
  }
);

const Subscription = donorDb.model("Subscription", subscriptionSchema);

export default Subscription;
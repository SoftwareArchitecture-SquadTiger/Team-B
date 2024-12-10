import express from "express";
import {
  getAllDonors,
  addDonor,
  getDonorById,
} from "../Modules/Donor/donor.controller.js";

const router = express.Router();

router.get("/all", getAllDonors); //GET all donors
router.get("/:id", getDonorById); //GET donor by id
router.post("/create", addDonor); //POST a donor

export default router;

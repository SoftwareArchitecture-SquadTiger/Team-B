import express from "express";
import {
  getAllDonors,
  addDonor,
  getDonorById,
  updateDonor,
  deleteDonor,
} from "./donor.controller.js";

const router = express.Router();

router.get("/all", getAllDonors);           //GET all donors
router.get("/:id", getDonorById);           //GET donor by id
router.post("/create", addDonor);           //POST a donor
router.put("/update/:id", updateDonor);     //PUT a donor
router.delete("/delete/:id", deleteDonor);  //DELETE a donor

export default router;

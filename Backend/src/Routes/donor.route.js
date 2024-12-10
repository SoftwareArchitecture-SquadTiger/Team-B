import express from 'express';
import { getAllDonors, addDonor } from '../Modules/Donor/donor.controller.js';

const router = express.Router();

router.get('/all', getAllDonors); //GET all donors
router.post('/create', addDonor); //POST a donor

export default router;

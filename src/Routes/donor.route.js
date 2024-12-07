import express from 'express';
import { getAllDonors, addDonor } from '../Modules/Donor/donor.controller.js';

const router = express.Router();

router.get('/all', getAllDonors); //GET 
router.post('/create', addDonor);    //POST 

export default router;

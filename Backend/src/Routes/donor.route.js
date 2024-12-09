import express from 'express';
import { getAllDonors, addDonor,updateDonor,deleteDonor } from '../Modules/Donor/donor.controller.js';

const router = express.Router();

router.get('/all', getAllDonors); //GET 
router.post('/create', addDonor); //POST 
router.put('/update/:id', updateDonor); //PUT
router.delete('/delete/:id', deleteDonor); //DELETE

export default router;

import express from 'express';
import {
    getAllCharities,
    getCharityById,
    addCharity,
    updateCharity,
    deleteCharity,
} from '../Modules/Charity/charity.controller.js';

const router = express.Router();

router.get('/all', getAllCharities);        // GET all charities
router.get('/:id', getCharityById);         // GET a specific charity by ID
router.post('/create', addCharity);         // POST (create) a new charity
router.put('/update/:id', updateCharity);   // PUT (update) a specific charity by ID
router.delete('/delete/:id', deleteCharity);// DELETE a specific charity by ID
 
export default router;
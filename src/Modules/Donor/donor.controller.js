import donorService from './donor.service.js';

export const getAllDonors = async (req, res, next) => {
    try {
        const donors = await donorService.getAllDonors();
        res.status(200).json({ success: true, data: donors });
    } catch (error) {
        next(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const addDonor = async (req, res, next) => {
    try {
        const donor = await donorService.addDonor(req.body);
        res.status(201).json({ success: true, data: donor });
    } catch (error) {
        next(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
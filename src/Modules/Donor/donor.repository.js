import Donor from "./donor.model.js";

const getAll = async () => {
    return await Donor.find({});
};

const create = async (donorData) => {
    const donor = new Donor(donorData);
    return await donor.save();
};

export default { getAll, create };
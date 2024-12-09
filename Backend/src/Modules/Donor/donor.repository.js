import Donor from "./donor.model.js";

const getAll = async () => {
    return await Donor.find({});
};

const create = async (donorData) => {
    const donor = new Donor(donorData);
    return await donor.save();
};
const update = async (id, donorData) => {
    return await Donor.findByIdAndUpdate(id, donorData, { new: true });
}
const deleteDonor = async (id) => {
    return await Donor.findByIdAndDelete(id);
}

export default { getAll, create };
import Donor from "./model.js";

const getAll = async () => {
  return await Donor.find({});
};

const getById = async (id) => {
  return await Donor.findOne({ donor_id: id });
};

const create = async (donorData) => {
  const donor = new Donor(donorData);
  return await donor.save();
};

const update = async (id, updateData) => {
  return await Donor.findOneAndUpdate({ donor_id: id }, updateData, {
    new: true,
    runValidators: true,
  });
};

const remove = async (id) => {
  return await Donor.findOneAndDelete({ donor_id: id });
};

export default { getAll, getById, create, update, remove };

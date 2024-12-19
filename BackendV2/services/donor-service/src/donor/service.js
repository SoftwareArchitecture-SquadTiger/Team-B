import donorRepository from "./repository.js";

const getAllDonors = async () => {
  return await donorRepository.getAll();
};

const getDonorById = async (id) => {
  return await donorRepository.getById(id);
};

const addDonor = async (donorData) => {
  return await donorRepository.create(donorData);
};

const updateDonor = async (id, donorData) => {
  return await donorRepository.update(id, donorData);
};

const deleteDonor = async (id) => {
  return await donorRepository.remove(id);
};

export default {
  getAllDonors,
  getDonorById,
  addDonor,
  updateDonor,
  deleteDonor,
};

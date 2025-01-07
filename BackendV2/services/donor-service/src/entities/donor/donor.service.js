import donorRepository from "./donor.repository.js";
import subscriptionRepository from "../subscription/subscription.repository.js";

const getAllDonors = async () => {
  return await donorRepository.getAll();
};

const getDonorById = async (id) => {
  return await donorRepository.getById(id);
};

const getDonorsBySubscribedCategories = async (categories) => {
  const documents = await subscriptionRepository.getByCategories(categories);
  //should have put the subscription data as a field of donors, not a separate collection :((
  const emails = documents.map((doc) => doc.email);

  return await donorRepository.getDonorsByEmails(emails);
};

const getDonorsBySubscribedRegions = async (regions) => {
  const documents = await subscriptionRepository.getByRegions(regions);

  const emails = documents.map((doc) => doc.email);

  return await donorRepository.getDonorsByEmails(emails);
};

const getFilteredDonors = async (filters) => {
  return await donorRepository.getByFilter(filters);
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
  getDonorsBySubscribedCategories,
  getDonorsBySubscribedRegions,
  getFilteredDonors,
  addDonor,
  updateDonor,
  deleteDonor,
};

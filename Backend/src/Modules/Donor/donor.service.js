import donorRepository from './donor.repository.js'

const getAllDonors = async () => {
    return await donorRepository.getAll();
};

const addDonor = async (donorData) => {
    return await donorRepository.create(donorData);
}
const updateDonor = async (id, donorData) => {
    return await donorRepository.update(id, donorData);
}
const deleteDonor = async (id) => {
    return await donorRepository.delete(id);
}
export default { getAllDonors, addDonor, updateDonor, deleteDonor };
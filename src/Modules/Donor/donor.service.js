import donorRepository from './donor.repository.js'

const getAllDonors = async () => {
    return await donorRepository.getAll();
};

const addDonor = async (donorData) => {
    return await donorRepository.create(donorData);
}

export default { getAllDonors, addDonor };
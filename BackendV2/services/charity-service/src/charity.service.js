import charityRepository from "./charity.repository.js";

const getAllCharities = async () => {
    return await charityRepository.getAll();
};

const getCharityById = async (id) => {
    return await charityRepository.getById(id);
};

const addCharity = async (charityData) => {
    return await charityRepository.create(charityData);
};

const updateCharity = async (id, charityData) => {
    return await charityRepository.update(id, charityData);
};

const deleteCharity = async (id) => {
    return await charityRepository.remove(id);
};

export default { 
    getAllCharities, 
    getCharityById, 
    addCharity, 
    updateCharity, 
    deleteCharity 
};
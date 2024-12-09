import Charity from './charity.model.js';

const getAll = async () => {
    return await Charity.find({});
};

const getById = async (id) => {
    return await Charity.findOne({ charity_id: id });
};

const create = async (charityData) => {
    const charity = new Charity(charityData);
    return await charity.save();
};

const update = async (id, updateData) => {
    return await Charity.findOneAndUpdate(
        { charity_id: id }, 
        updateData,
        { new: true, runValidators: true }
    );
};

const remove = async (id) => {
    return await Charity.findOneAndDelete({ charity_id: id }); 
};

export default { getAll, getById, create, update, remove };
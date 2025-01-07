import Charity from "./model.js";

const getAll = async () => {
  return await Charity.find({});
};

const getById = async (id) => {
  return await Charity.findOne({ charity_id: id });
};

const getByFilter = async (filters) => {
  const query = {};

  for (const [key, value] of Object.entries(filters)) {
    query[key] = value;
  }

  return await Charity.find(query).exec();
};

const create = async (charityData) => {
  const charity = new Charity(charityData);
  return await charity.save();
};

const update = async (id, updateData) => {
  return await Charity.findOneAndUpdate({ charity_id: id }, updateData, {
    new: true,
    runValidators: true,
  });
};

const remove = async (id) => {
  return await Charity.findOneAndDelete({ charity_id: id });
};

export default { getAll, getById, getByFilter, create, update, remove };

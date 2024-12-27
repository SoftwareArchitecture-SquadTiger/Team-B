import Subscription from "./subscription.model.js";

const getByEmail = async (email) => {
  return await Subscription.findOne({ email: email });
};

const getByCategories = async (categories) => {
  return await Subscription.find({ categories: { $in: categories } });
};

const getByRegions = async (regions) => {
  return await Subscription.find({ regions: { $in: regions } });
};

const create = async (subscriptionData) => {
  const subscription = new Subscription(subscriptionData);
  return await subscription.save();
};

const update = async (email, updateData) => {
  return await Subscription.findOneAndUpdate({ email: email }, updateData, {
    new: true,
    runValidators: true,
  });
};

const remove = async (email) => {
  return await Subscription.findOneAndDelete({ email: email });
};

export default {
  getByEmail,
  getByCategories,
  getByRegions,
  create,
  update,
  remove,
};

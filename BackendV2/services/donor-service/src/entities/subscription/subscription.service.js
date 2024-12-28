import subscriptionRepository from "./subscription.repository.js";
import donorRepository from "../donor/donor.repository.js";

const getSubscriptionsByEmail = async (email) => {
    return await subscriptionRepository.getByEmail(email);
};

const getEmailsByCategories = async (categories) => {
    return await subscriptionRepository.getByCategories(categories);
};

const createSubscriptions = async (subscriptionData) => {
    return await subscriptionRepository.create(subscriptionData);
};

const updateSubscriptions = async (email, subscriptionData) => {
    return await subscriptionRepository.update(email, subscriptionData);
};

const clearSubscriptions = async (email) => {
    return await subscriptionRepository.remove(email)
};

export default {
    getSubscriptionsByEmail,
    getEmailsByCategories,
    createSubscriptions,
    updateSubscriptions,
    clearSubscriptions,
}
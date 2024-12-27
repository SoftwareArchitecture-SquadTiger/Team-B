import subscriptionRepository from "./subscription.repository.js";
import donorRepository from "../donor/donor.repository.js";

const getSubscriptionsByEmail = async (email) => {
    return await subscriptionRepository.getByEmail(email);
};

const getEmailsByCategories = async (categories) => {
    return await subscriptionRepository.getByCategories(categories);
};

export default {
    getSubscriptionsByEmail,
    getEmailsByCategories,
}
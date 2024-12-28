import donorService from "../entities/donor/donor.service.js";
import subscriptionService from "../entities/subscription/subscription.service.js";

export const actionHandlers = {
  // ======================= Donor Handlers =======================
  GET_ALL: async () => {
    const donors = await donorService.getAllDonors();
    return { status: "success", data: donors };
  },
  GET_BY_ID: async (data) => {
    const donor = await donorService.getDonorById(data.id);
    return { status: "success", data: donor ? donor.toJSON() : null };
  },
  GET_BY_CATEGORIES: async (data) => {
    const donors = await donorService.getDonorsBySubscribedCategories(
      data.categories
    );
    return { status: "success", data: donors };
  },
  GET_BY_REGIONS: async (data) => {
    const donors = await donorService.getDonorsBySubscribedRegions(
      data.regions
    );
    return { status: "success", data: donors };
  },
  ADD: async (data) => {
    const newDonor = await donorService.addDonor(data);
    return { status: "success", data: newDonor.toJSON() };
  },
  UPDATE: async (data) => {
    const updatedDonor = await donorService.updateDonor(data.id, data.update);
    return { status: "success", data: updatedDonor.toJSON() };
  },
  DELETE: async (data) => {
    await donorService.deleteDonor(data.id);
    return { status: "success", message: "Donor deleted successfully" };
  },
  // =================== Subscription Handlers ===================
  GET_SUBSCRIPTIONS_BY_EMAIL: async (data) => {
    const subscriptions = await subscriptionService.getSubscriptionsByEmail(
      data.email
    );
    return { status: "success", data: subscriptions };
  },
  GET_EMAILS_BY_CATEGORIES: async (data) => {
    const emails = await subscriptionService.getEmailsByCategories(
      data.categories
    );
    return { status: "success", data: emails };
  },
  CREATE_SUBSCRIPTION: async (data) => {
    const newSubscription = await subscriptionService.createSubscriptions(data);
    return { status: "success", data: newSubscription };
  },
  UPDATE_SUBSCRIPTION: async (data) => {
    const updatedSubscriptions = await subscriptionService.updateSubscriptions(data.email, data.update);
    return { status: "success", data: updatedSubscriptions.toJSON() };
  },
  CLEAR_SUBSCRIPTION: async (data) => {
    await subscriptionService.clearSubscriptions(data.email);
    return { status: "success", message: "Subscription clear!" };
  },
};

export const defaultHandler = async () => {
  return { status: "error", message: "Unknown action" };
};

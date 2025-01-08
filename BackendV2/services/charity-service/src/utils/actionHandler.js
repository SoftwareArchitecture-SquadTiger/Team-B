import statisticsService from "../service/statisticsService.js";

export const actionHandlers = {
  GET_TOTAL_DONATIONS_BY_DAY: async () => {
    const donationsByDay = await statisticsService.getTotalDonationsByDay();
    return { status: "success", data: donationsByDay };
  },
  GET_TOTAL_DONATIONS_BY_DONOR: async (data) => {
    const totalDonations = await statisticsService.getTotalDonationByDonor(data.donorId, data.lastUpdated);
    return { status: "success", data: totalDonations };
  },
  GET_DONOR_LEADERBOARD: async (data) => {
    const leaderboard = await statisticsService.getDonorLeaderboard(data.limit, data.lastUpdated);
    return { status: "success", data: leaderboard };
  },
};

export const defaultHandler = async () => {
  return { status: "error", message: "Unknown action" };
};

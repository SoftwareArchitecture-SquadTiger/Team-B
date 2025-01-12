import { getTotalDonationByDonor, getDonorLeaderboard, getTotalDonationsByDay,  getTotalDonationForProject, getDonationsByMonth} from "../service/donationService.js";
import {
  getProjectsCreatedPerMonth,
  getProjectsByCountry,
getProjectsByCategory,
getProjectsByMonth,
} from "../service/projectService.js";

export const actionHandlers = {
  // Donation Service Handlers
  GET_TOTAL_DONATIONS_BY_DAY: async (data) => {
    const donationsByDay = await getTotalDonationsByDay(data.startDate, data.endDate);
    return { status: "success", data: donationsByDay };
  },
  GET_TOTAL_DONATIONS_BY_DONOR: async (data) => {
    const totalDonations = await getTotalDonationByDonor(data.donorId);
    return { status: "success", data: totalDonations };
  },
  GET_DONOR_LEADERBOARD: async () => {
    const leaderboard = await getDonorLeaderboard();
    return { status: "success", data: leaderboard };
  },
  // Project Service Handlers
  GET_TOTAL_DONATION_FOR_PROJECT: async (data) => {
    const totalDonation = await getTotalDonationForProject(data.projectId);
    return { status: "success", data: totalDonation };
  },
  GET_PROJECTS_CREATED_PER_MONTH: async () => {
    const projectsPerMonth = await getProjectsCreatedPerMonth();
    return { status: "success", data: projectsPerMonth };
  },
  GET_PROJECTS_BY_COUNTRY: async (data) => {
    const projectsByCountry = await getProjectsByCountry();
    return { status: "success", data: projectsByCountry };
  },
  GET_PROJECTS_BY_CATEGORY: async (data) => {
    const projectsByCategory = await getProjectsByCategory();
    return { status: "success", data: projectsByCategory };
  },
  GET_PROJECTS_BY_MONTH: async (data) => {
    const projectsByMonth = await getProjectsByMonth(data.startMonth,data.endMonth);
    return { status: "success", data: projectsByMonth };
  },
  GET_TOTAL_DONATIONS_BY_MONTH: async (data) => {
    const donationByMonth = await getDonationsByMonth(data.startMonth,data.endMonth);
    return { status: "success", data: donationByMonth };
  },
};


export const defaultHandler = async () => {
  return { status: "error", message: "Unknown action" };
};

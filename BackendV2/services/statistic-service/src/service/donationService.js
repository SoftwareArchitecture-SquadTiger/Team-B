import Donation from '../model/donation.js';
import { fetchAndUpdateDonations } from './dataFetcher.js';
import { produceGetAllMessage } from '../events/producer.js';
import axios from 'axios';

const TeamAPath = process.env.TEAM_A_API_GATEWAY;

/**
 * Fetch total donations by a specific donor.
 */
const getTotalDonationByDonor = async (donorId) => {
  try {
    const localTotal = await Donation.aggregate([
      { $match: { donor_id: donorId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const latestDonations = await fetchAndUpdateDonations();
    const latestTotal = latestDonations
      ?.filter((donation) => donation.donor_id === donorId)
      .reduce((sum, donation) => sum + donation.amount, 0) || 0;

    return (localTotal[0]?.totalAmount || 0) + latestTotal;
  } catch (error) {
    console.error(`Error in getTotalDonationByDonor: ${error.message}`);
    throw error;
  }
};

/**
 * Generate a leaderboard of top 10 donors for the current month.
 */
const getDonorLeaderboard = async () => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const queryParams = { timePeriod: 'month', year: currentYear, month: currentMonth };

    await fetchAndUpdateDonations();

    const localLeaderboard = await Donation.aggregate([
      { $match: { ...buildFilters(queryParams), donor_id: { $nin: [null, ""] } } },
      { $group: { _id: "$donor_id", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
    ]);

    return localLeaderboard.map((entry) => ({
      donor_id: entry._id,
      totalAmount: entry.totalAmount,
      name: 'Unknown Donor', // Replace with actual donor info if available
      profileImage: 'default.png',
    }));
  } catch (error) {
    console.error(`Error generating donor leaderboard: ${error.message}`);
    throw error;
  }
};

/**
 * Generate a leaderboard of top 10 charities for the current month.
 */
const getCharityLeaderboard = async () => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const response = await produceGetAllMessage('charity-request', { action: 'GET_ALL' });
    const charities = response.data;

    const charityDonations = await Promise.all(
      charities.map(async (charity) => {
        try {
          if (!charity.charity_id) return { charity, totalDonation: 0 };

          const response = await axios.get(
            `${TeamAPath}donation/total-donations/charity/${charity.charity_id}`,
            {
              params: {
                'internal-api': process.env.INTERNAL_API_KEY,
                year: currentYear,
                month: currentMonth,
              },
            }
          );

          return {
            charity,
            totalDonation: response.data.donationResponse.totalAmount || 0,
          };
        } catch {
          return { charity, totalDonation: 0 };
        }
      })
    );

    return charityDonations
      .filter((entry) => entry.totalDonation > 0)
      .sort((a, b) => b.totalDonation - a.totalDonation)
      .slice(0, 10)
      .map((entry, index) => ({
        rank: index + 1,
        charity_name: entry.charity.name,
        totalDonation: entry.totalDonation,
        profileImage: entry.charity.image_url || "default.png",
      }));
  } catch (error) {
    console.error(`Error generating charity leaderboard: ${error.message}`);
    throw error;
  }
};

/**
 * Fetch total donations grouped by day within a specified date range.
 */
const getTotalDonationsByDay = async (startDate, endDate) => {
  try {
    const latestDonations = await fetchAndUpdateDonations({ startDate, endDate });
    const filters = buildFilters({ timePeriod: 'custom', startDate, endDate });

    const localData = await Donation.aggregate([
      { $match: filters },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const allDates = generateDateRange(startDate, endDate);
    return allDates.map((date) => {
      const existing = localData.find((item) => item._id === date);
      return { date, totalAmount: existing?.totalAmount || 0 };
    });
  } catch (error) {
    console.error(`Error in getTotalDonationsByDay: ${error.message}`);
    throw error;
  }
};

// Helper functions like generateDateRange, buildFilters, etc., remain unchanged.

export {
  getTotalDonationByDonor,
  getDonorLeaderboard,
  getCharityLeaderboard,
  getTotalDonationsByDay,
  getTotalDonationForProject,
  getDonationsByMonth,
};

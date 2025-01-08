import Donation from '../models/Donation.js';

/**
 * Calculate the total donation amount for a specific donor by combining local and latest data.
 * @param {String} donorId - The unique ID of the donor.
 * @param {Date} lastUpdated - The last sync date.
 * @returns {Number} Total amount of donations made by the donor.
 */
const getTotalDonationByDonor = async (donorId, lastUpdated) => {
  // Fetch local data
  const localTotal = await Donation.aggregate([
    { $match: { donor_id: donorId } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  // Fetch latest data
  const latestDonations = await fetchLatestDonations(lastUpdated);
  const latestTotal = latestDonations
    .filter((donation) => donation.donor_id === donorId)
    .reduce((sum, donation) => sum + donation.amount, 0);

  // Combine local and latest totals
  return (localTotal[0]?.totalAmount || 0) + latestTotal;
};

/**
 * Generate a leaderboard of donors by combining local and latest data.
 * @param {Number} limit - The number of top donors to return.
 * @param {Date} lastUpdated - The last sync date.
 * @returns {Array} List of donors with their total donations.
 */
const getDonorLeaderboard = async (limit = 10, lastUpdated) => {
    // Fetch local data
    const localLeaderboard = await Donation.aggregate([
      { $group: { _id: "$donor_id", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
      { $limit: limit },
    ]);
  
    // Fetch latest data
    const latestDonations = await fetchLatestDonations(lastUpdated);
    const latestTotals = latestDonations.reduce((acc, donation) => {
      acc[donation.donor_id] = (acc[donation.donor_id] || 0) + donation.amount;
      return acc;
    }, {});
  
    // Combine local and latest data
    const combinedTotals = {};
    localLeaderboard.forEach((entry) => {
      combinedTotals[entry._id] = entry.totalAmount + (latestTotals[entry._id] || 0);
    });
    Object.entries(latestTotals).forEach(([donorId, total]) => {
      if (!combinedTotals[donorId]) {
        combinedTotals[donorId] = total;
      }
    });
  
    // Format leaderboard and sort
    const combinedLeaderboard = Object.entries(combinedTotals)
      .map(([donor_id, totalAmount]) => ({ donor_id, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, limit);
  
    return combinedLeaderboard;
  };
  
  import { fetchLatestDonations } from './externalService.js';

/**
 * Calculate total donations grouped by day, including latest data from API.
 * @param {Date} lastUpdated - The last sync date.
 * @returns {Array} List of objects containing date and total donation amount for each day.
 */
const getTotalDonationsByDayWithLatest = async (lastUpdated) => {
  // Step 1: Fetch local data
  const localData = await Donation.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalAmount: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        date: "$_id",
        totalAmount: 1,
        _id: 0,
      },
    },
  ]);

  // Step 2: Fetch latest data
  const latestDonations = await fetchLatestDonations(lastUpdated);

  // Step 3: Aggregate latest data
  const latestData = latestDonations.reduce((acc, donation) => {
    const date = donation.createdAt.split("T")[0]; // Extract date from ISO string
    acc[date] = (acc[date] || 0) + donation.amount;
    return acc;
  }, {});

  // Step 4: Combine local and latest data
  const combinedData = [...localData];

  for (const [date, totalAmount] of Object.entries(latestData)) {
    const existing = combinedData.find((item) => item.date === date);
    if (existing) {
      existing.totalAmount += totalAmount;
    } else {
      combinedData.push({ date, totalAmount });
    }
  }

  // Step 5: Sort combined data by date
  combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return combinedData;
};

export { getTotalDonationByDonor, getDonorLeaderboard, getTotalDonationsByDayWithLatest };
import Donation from '../models/Donation.js';
import Project from '../models/Project.js';

/**
 * Calculate the total donation amount for a specific donor using only local data.
 * @param {String} donorId - The unique ID of the donor.
 * @returns {Number} Total amount of donations made by the donor.
 */
const getTotalDonationByDonorLocal = async (donorId) => {
  const localTotal = await Donation.aggregate([
    { $match: { donor_id: donorId } },
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
  ]);

  return localTotal[0]?.totalAmount || 0;
};

/**
 * Generate a leaderboard of donors using only local data.
 * @param {Number} limit - The number of top donors to return.
 * @returns {Array} List of donors with their total donations.
 */
const getDonorLeaderboardLocal = async (limit = 10) => {
  const localLeaderboard = await Donation.aggregate([
    { $group: { _id: '$donor_id', totalAmount: { $sum: '$amount' } } },
    { $sort: { totalAmount: -1 } },
    { $limit: limit },
  ]);

  return localLeaderboard.map((entry) => ({
    donor_id: entry._id,
    totalAmount: entry.totalAmount,
  }));
};

/**
 * Calculate total donations grouped by day using only local data.
 * @returns {Array} List of objects containing date and total donation amount for each day.
 */
const getTotalDonationsByDayLocal = async () => {
  const localData = await Donation.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalAmount: { $sum: '$amount' },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        date: '$_id',
        totalAmount: 1,
        _id: 0,
      },
    },
  ]);

  return localData;
};

/**
 * Get the number of projects created per month using only local data.
 * @returns {Array} List of months with the count of projects created.
 */
const getProjectsCreatedPerMonthLocal = async () => {
  const localData = await Project.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        projectCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        month: '$_id',
        projectCount: 1,
        _id: 0,
      },
    },
  ]);

  return localData;
};

export {
  getTotalDonationByDonorLocal,
  getDonorLeaderboardLocal,
  getTotalDonationsByDayLocal,
  getProjectsCreatedPerMonthLocal,
};

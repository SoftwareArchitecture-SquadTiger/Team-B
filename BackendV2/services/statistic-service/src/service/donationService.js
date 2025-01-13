import Donation from '../model/donation.js';
import {fetchAndUpdateDonations} from './dataFetcher.js';
import {produceGetAllMessage} from './kafkaProducer.js';
/**
 * Fetch total donations by a specific donor.
 */
const getTotalDonationByDonor = async (donorId) => {
  // Step 1: Fetch local data from MongoDB
  const localTotal = await Donation.aggregate([
    { $match: { donor_id: donorId } }, // Match donor ID
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }, // Sum all donations by this donor
      },
    },
  ]);

  console.log("Local total donations:", localTotal);

  // Step 2: Fetch and process the latest donations
  const latestDonations = (await fetchAndUpdateDonations()) || []; // Fetch all latest donations
  console.log("Latest donations:", latestDonations);

  const latestTotal = latestDonations
    .filter((donation) => donation.donor_id === donorId) // Filter by donor ID
    .reduce((sum, donation) => sum + donation.amount, 0); // Sum the amounts

  console.log("Latest total donations:", latestTotal);

  // Step 3: Combine local and latest totals
  const combinedTotal = (localTotal[0]?.totalAmount || 0) + latestTotal;
  console.log("Combined total donations:", combinedTotal);

  return combinedTotal;
};


/**
 * Generate a leaderboard of top 10 donors for the current month.
 */
const getDonorLeaderboard = async () => {
  try {
    // Step 1: Get the current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Step 2: Build query params for the current month
    const queryParams = {
      timePeriod: 'month',
      year: currentYear,
      month: currentMonth,
    };

    // Step 3: Fetch and update donations in the local database
    await fetchAndUpdateDonations();
    console.log('Donations have been fetched and updated.');

    // Step 4: Fetch the local leaderboard from the database
    const localLeaderboard = await Donation.aggregate([
      { $match: { ...buildFilters(queryParams), donor_id: { $ne: null } } }, // Exclude null donor IDs
      { $group: { _id: "$donor_id", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
    ]);

    console.log('Local leaderboard:', localLeaderboard);

    // Step 5: Fetch donor details using produceGetAllMessage
    const donors = await produceGetAllMessage('donor-request', { action: 'GET_ALL' });
    console.log('Fetched donors:', donors);

    // Step 6: Merge donor details into the leaderboard
    const enrichedLeaderboard = localLeaderboard.map((entry) => {
      const donor = donors.find((donor) => donor.id === entry._id);
      return {
        donor_id: entry._id,
        totalAmount: entry.totalAmount,
        name: donor ? `${donor.first_name} ${donor.last_name}` : 'Unknown Donor',
      };
    });

    console.log('Final enriched leaderboard:', enrichedLeaderboard);

    return enrichedLeaderboard;
  } catch (error) {
    console.error('Error generating donor leaderboard:', error.message);
    throw error;
  }
};

import { produceGetAllMessage } from './kafkaProducer.js'; // Adjust the path based on your project structure
import axios from 'axios';

/**
 * Generate a leaderboard of top 10 charities for the current month.
 */
const getTopCharities = async (req, res) => {
  try {
    // Step 1: Get the current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    console.log('Fetching all charities...');

    // Step 2: Fetch all charities using produceGetAllMessage
    const allCharities = await produceGetAllMessage('charity-service-request', { action: 'GET_ALL' });
    console.log('Fetched charities:', allCharities);

    if (!Array.isArray(allCharities) || allCharities.length === 0) {
      return res.status(404).json({ message: 'No charities found.' });
    }

    console.log('Fetching donations for each charity...');

    // Step 3: Fetch donations for each charity
    const charityDonations = await Promise.all(
      allCharities.map(async (charity) => {
        try {
          // Fetch donations for the current month and year
          const donationsResponse = await axios.get(`https://api.example.com/donations`, {
            params: {
              charity_id: charity.charity_id,
              year: currentYear,
              month: currentMonth,
            },
          });

          const donations = donationsResponse.data;

          // Calculate total donations for the charity
          const totalDonation = donations.reduce((sum, donation) => sum + donation.amount, 0);

          return {
            charity,
            totalDonation,
          };
        } catch (err) {
          console.error(`Error fetching donations for charity ID ${charity.charity_id}:`, err.message);
          return { charity, totalDonation: 0 }; // Return 0 if there is an error
        }
      })
    );

    console.log('Charity donations:', charityDonations);

    // Step 4: Filter out charities without donations
    const filteredCharities = charityDonations.filter((entry) => entry.totalDonation > 0);

    // Step 5: Rank charities by donation amount
    const rankedCharities = filteredCharities.sort((a, b) => b.totalDonation - a.totalDonation);

    // Step 6: Get the top 10 charities
    const topCharities = rankedCharities.slice(0, 10).map((entry, index) => ({
      rank: index + 1,
      charity_id: entry.charity.charity_id,
      charity_name: entry.charity.name,
      totalDonation: entry.totalDonation,
    }));

    console.log('Top charities:', topCharities);

    res.status(200).json(topCharities);
  } catch (err) {
    console.error('Error generating charity leaderboard:', err.message);
    res.status(500).json({ error: err.message });
  }
};

export { getTopCharities };

/**
 * Fetch total donations grouped by day within a specified date range.
 */
const getTotalDonationsByDay = async (startDate, endDate) => {
  // Step 1: Generate the filters for MongoDB query
  const latestDonations = (await fetchAndUpdateDonations({ startDate, endDate })) || [];

  const filters = buildFilters({ timePeriod: 'custom', startDate, endDate });

  // Step 2: Fetch local data from MongoDB
  const localData = await Donation.aggregate([
    { $match: filters }, // Apply the filters
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
        totalAmount: { $sum: "$amount" }, // Sum donation amounts
      },
    },
    { $sort: { _id: 1 } }, // Sort by date
    {
      $project: {
        date: "$_id", // Rename `_id` to `date`
        totalAmount: 1,
        _id: 0, // Exclude `_id` from output
      },
    },
  ]);

  // Step 5: Fill in missing dates with zero donations
  const allDates = generateDateRange(startDate, endDate); // Generate all dates in the range
  const completeData = allDates.map((date) => {
    const existing = localData.find((item) => item.date === date);
    return { date, totalAmount: existing ? existing.totalAmount : 0 }; // Fill missing dates with 0
  });

  console.log("Complete data:", completeData);

  // Step 6: Return the complete data sorted by date
  return completeData.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Generate a range of dates from startDate to endDate (inclusive).
 */
const generateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];
  while (start <= end) {
    dates.push(start.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    start.setDate(start.getDate() + 1); // Increment by 1 day
  }
  return dates;
};

const getTotalDonationForProject = async (projectId) => {
  try {
    // Step 1: Validate inputs
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    // Step 2: Fetch local donations from the database
    const localTotalResult = await Donation.aggregate([
      { $match: { project_id: projectId } }, // Match project_id and filter by queryParams
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Sum donation amounts
    ]);

    const localTotal = localTotalResult[0]?.totalAmount || 0; // Handle empty aggregation results
    console.log("Local total:", localTotal);

    // Step 3: Fetch latest donations
    const latestDonations = (await fetchAndUpdateDonations()) || []; // Default to an empty array
    console.log("Latest donations:", latestDonations);

    const latestTotal = latestDonations
      .filter((donation) => donation.project_id === projectId) // Filter by project_id
      .reduce((sum, donation) => sum + donation.amount, 0); // Sum donation amounts
    console.log("Latest total:", latestTotal);

    // Step 4: Combine local and latest totals
    const combinedTotal = localTotal + latestTotal;
    console.log("Combined total donations for project:", combinedTotal);

    return combinedTotal;
  } catch (error) {
    console.error("Error in getTotalDonationForProject:", error.message);
    throw error; // Re-throw error for higher-level handling
  }
};
/**
 * Fetch total donations grouped by month within a specified date range.
 * @param {String} startDate - Start date in 'YYYY-MM-DD' format.
 * @param {String} endDate - End date in 'YYYY-MM-DD' format.
 * @returns {Array} Total donations grouped by month.
 */
const getDonationsByMonth = async (startMonth, endMonth) => {
  // Step 1: Generate the filters for MongoDB query
  const filters = buildFilters({ timePeriod: 'custom', startMonth, endMonth });
  // Step 3: Fetch latest donations for the date range
  const latestDonations = (await fetchAndUpdateDonations()) || [];
  console.log("Latest donations:", latestDonations);
  // Step 2: Fetch local data from MongoDB
  const localData = await Donation.aggregate([
    { $match: filters }, // Apply the filters
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
        totalAmount: { $sum: "$amount" }, // Sum donation amounts
      },
    },
    { $sort: { _id: 1 } }, // Sort by month
    {
      $project: {
        month: "$_id", // Rename `_id` to `month`
        totalAmount: 1,
        _id: 0, // Exclude `_id` from output
      },
    },
  ]);

  console.log("Local data by month:", localData);


  // Step 6: Fill in missing months with zero donations
  const allMonths = generateMonthRange(startMonth, endMonth); // Generate all months in the range
  const completeData = allMonths.map((month) => {
    const existing = localData.find((item) => item.month === month);
    return { month, totalAmount: existing ? existing.totalAmount : 0 }; // Fill missing months with 0
  });

  console.log("Complete data:", completeData);

  // Step 7: Return the complete data sorted by month
  return completeData.sort((a, b) => new Date(a.month) - new Date(b.month));
};

/**
 * Generate a range of months from startDate to endDate (inclusive).
 * @param {String} startDate - Start date in 'YYYY-MM-DD' format.
 * @param {String} endDate - End date in 'YYYY-MM-DD' format.
 * @returns {Array} Array of months in 'YYYY-MM' format.
 */
const generateMonthRange = (startMonth, endMonth) => {
  const start = new Date(startMonth);
  const end = new Date(endMonth);
  const months = [];

  // Ensure start is the first day of the month
  start.setDate(1);

  while (start <= end) {
    months.push(start.toISOString().slice(0, 7)); // Format as 'YYYY-MM'
    start.setMonth(start.getMonth() + 1); // Increment by 1 month
  }

  return months;
};


/**
 * Build query filters for MongoDB based on provided query parameters.
 * Supports filtering by year, month, custom date ranges, and startMonth-endMonth.
 * @param {Object} queryParams - Query parameters for filtering.
 * @returns {Object} MongoDB query filters.
 */
const buildFilters = (queryParams) => {
  const filters = {};

  if (queryParams.timePeriod === 'year' && queryParams.year) {
    // Filter by year
    filters.createdAt = {
      $gte: new Date(`${queryParams.year}-01-01`),
      $lt: new Date(`${queryParams.year + 1}-01-01`),
    };
  } else if (queryParams.timePeriod === 'month' && queryParams.year && queryParams.month) {
    // Filter by specific month
    const startDate = new Date(`${queryParams.year}-${queryParams.month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    filters.createdAt = { $gte: startDate, $lt: endDate };
  } else if (queryParams.timePeriod === 'custom' && queryParams.startDate && queryParams.endDate) {
    // Filter by custom date range
    let { startDate, endDate } = queryParams;

    // Convert to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate date range
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid startDate or endDate provided.");
    }

    // Automatically fix reversed date ranges
    if (start > end) {
      console.warn("startDate is later than endDate. Swapping the values.");
      [startDate, endDate] = [endDate, startDate];
    }

    filters.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  } else if (queryParams.startMonth && queryParams.endMonth) {
    // Filter by startMonth and endMonth
    const startMonth = new Date(`${queryParams.startMonth}-01`); // First day of startMonth
    const endMonth = new Date(`${queryParams.endMonth}-01`); // First day of endMonth
    endMonth.setMonth(endMonth.getMonth() + 1); // Move to the next month
    endMonth.setDate(0); // Set to the last day of the specified month

    // Validate month range
    if (isNaN(startMonth.getTime()) || isNaN(endMonth.getTime())) {
      throw new Error("Invalid startMonth or endMonth provided.");
    }

    // Automatically fix reversed month ranges
    if (startMonth > endMonth) {
      console.warn("startMonth is later than endMonth. Swapping the values.");
      [startMonth, endMonth] = [endMonth, startMonth];
    }

    filters.createdAt = {
      $gte: startMonth,
      $lte: endMonth,
    };
  } else {
    throw new Error("Invalid query parameters for building filters.");
  }

  return filters;
};



export { getTotalDonationByDonor, getDonorLeaderboard, getTotalDonationsByDay, getTotalDonationForProject, getDonationsByMonth };

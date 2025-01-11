import Donation from '../model/donation.js';
import {fetchAndUpdateDonations} from './dataFetcher.js';
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
  // Step 1: Get the current month and year
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Step 2: Build query params for the current month
  const queryParams = {
    timePeriod: "month",
    year: currentYear,
    month: currentMonth,
  };

  // Step 3: Fetch local leaderboard
  const localLeaderboard = await Donation.aggregate([
    { $match: buildFilters(queryParams) }, // Filter donations for the current month
    { $group: { _id: "$donor_id", totalAmount: { $sum: "$amount" } } }, // Group by donor_id
    { $sort: { totalAmount: -1 } }, // Sort by total amount in descending order
    { $limit: 10 }, // Limit to top 10 donors
  ]);

  console.log("Local leaderboard:", localLeaderboard);

  // Step 4: Fetch latest donations for the current month
  const latestDonations = (await fetchAndUpdateDonations(queryParams)) || []; // Ensure it defaults to an empty array
  console.log("Latest donations:", latestDonations);

  // Step 5: Calculate totals from the latest donations
  const latestTotals = latestDonations.reduce((acc, donation) => {
    if (donation.donor_id) { // Safeguard against missing donor_id
      acc[donation.donor_id] = (acc[donation.donor_id] || 0) + donation.amount;
    }
    return acc;
  }, {});

  console.log("Latest totals:", latestTotals);

  // Step 6: Combine local and latest totals
  const combinedTotals = {};

  // Add local totals to combinedTotals
  localLeaderboard.forEach((entry) => {
    combinedTotals[entry._id] = entry.totalAmount + (latestTotals[entry._id] || 0);
  });

  // Add latest totals for donors not in localLeaderboard
  Object.entries(latestTotals).forEach(([donorId, total]) => {
    if (!combinedTotals[donorId]) {
      combinedTotals[donorId] = total;
    }
  });

  // Step 7: Format the combined totals into a leaderboard
  const leaderboard = Object.entries(combinedTotals)
    .map(([donor_id, totalAmount]) => ({ donor_id, totalAmount }))
    .sort((a, b) => b.totalAmount - a.totalAmount) // Sort by total amount
    .slice(0, 10); // Limit to top 10

  console.log("Final leaderboard:", leaderboard);

  return leaderboard;
};


/**
 * Fetch total donations grouped by day within a specified date range.
 */
const getTotalDonationsByDay = async (startDate, endDate) => {
  // Step 1: Generate the filters for MongoDB query
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

  console.log("Local data:", localData);

  // Step 3: Fetch latest donations for the date range
  const latestDonations = (await fetchAndUpdateDonations({ startDate, endDate })) || [];
  console.log("Latest donations:", latestDonations);

  const latestData = latestDonations.reduce((acc, donation) => {
    const date = donation.createdAt.split("T")[0]; // Extract date as YYYY-MM-DD
    acc[date] = (acc[date] || 0) + donation.amount;
    return acc;
  }, {});

  console.log("Latest data grouped by day:", latestData);

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

  console.log("Combined data before filling missing dates:", combinedData);

  // Step 5: Fill in missing dates with zero donations
  const allDates = generateDateRange(startDate, endDate); // Generate all dates in the range
  const completeData = allDates.map((date) => {
    const existing = combinedData.find((item) => item.date === date);
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

const buildFilters = (queryParams) => {
  const filters = {};

  if (queryParams.timePeriod === 'year' && queryParams.year) {
    filters.createdAt = {
      $gte: new Date(`${queryParams.year}-01-01`),
      $lt: new Date(`${queryParams.year + 1}-01-01`),
    };
  } else if (queryParams.timePeriod === 'month' && queryParams.year && queryParams.month) {
    const startDate = new Date(`${queryParams.year}-${queryParams.month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    filters.createdAt = { $gte: startDate, $lt: endDate };
  } else if (queryParams.timePeriod === 'custom' && queryParams.startDate && queryParams.endDate) {
    let { startDate, endDate } = queryParams;

    // Convert to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Handle invalid date ranges
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid startDate or endDate provided");
    }

    // Automatically fix reversed date ranges
    if (start > end) {
      console.warn("startDate is later than endDate. Swapping the values.");
      [startDate, endDate] = [endDate, startDate]; // Swap the dates
    }

    filters.createdAt = { $gte: new Date(startDate), $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000) }; // Include endDate
  } else {
    throw new Error("Invalid query parameters for building filters");
  }

  return filters;
};


export { getTotalDonationByDonor, getDonorLeaderboard, getTotalDonationsByDay, getTotalDonationForProject };

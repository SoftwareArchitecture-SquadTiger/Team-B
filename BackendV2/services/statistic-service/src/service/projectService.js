import Project from './models/Project.js';
import Donation from './models/Donation.js';
import axios from 'axios';

/**
 * Fetch today's donations from an external API.
 * @param {String} projectId - The unique ID of the project (optional).
 * @returns {Array} List of today's donations.
 */
const fetchTodaysDonations = async (projectId = null) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day
  const response = await axios.get(
    `https://api.example.com/donations?updated_after=${today.toISOString()}`
  );
  const todaysDonations = response.data;
  return projectId
    ? todaysDonations.filter((donation) => donation.project_id === projectId)
    : todaysDonations;
};

/**
 * Fetch today's projects from an external API.
 * @returns {Array} List of today's projects.
 */
const fetchTodaysProjects = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day
  const response = await axios.get(
    `https://api.example.com/projects?updated_after=${today.toISOString()}`
  );
  return response.data;
};

/**
 * Get the total donation received for a specific project, including today's data.
 * @param {String} projectId - The unique ID of the project.
 * @returns {Number} Total amount of donations received.
 */
const getTotalDonationForProject = async (projectId) => {
  // Fetch local data
  const localTotal = await Donation.aggregate([
    { $match: { project_id: projectId } }, // Filter by project ID
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }, // Sum donation amounts
      },
    },
  ]);

  // Fetch today's data
  const todaysDonations = await fetchTodaysDonations(projectId);
  const todaysTotal = todaysDonations.reduce((sum, donation) => sum + donation.amount, 0);

  // Combine local and today's data
  return (localTotal[0]?.totalAmount || 0) + todaysTotal;
};

/**
 * Get the number of projects created per month, including today's data.
 * @returns {Array} List of months with the count of projects created.
 */
const getProjectsCreatedPerMonth = async () => {
  // Fetch local data
  const localData = await Project.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
        projectCount: { $sum: 1 }, // Count projects
      },
    },
    { $sort: { _id: 1 } }, // Sort by month (ascending)
    {
      $project: {
        month: "$_id", // Rename _id to month
        projectCount: 1, // Include project count
        _id: 0, // Exclude _id
      },
    },
  ]);

  // Fetch today's data
  const todaysProjects = await fetchTodaysProjects();
  const todaysMonth = new Date().toISOString().slice(0, 7); // Format as YYYY-MM
  const todaysCount = todaysProjects.length;

  // Combine local and today's data
  const combinedData = [...localData];
  const existingMonth = combinedData.find((entry) => entry.month === todaysMonth);

  if (existingMonth) {
    existingMonth.projectCount += todaysCount;
  } else {
    combinedData.push({ month: todaysMonth, projectCount: todaysCount });
  }

  // Sort combined data
  combinedData.sort((a, b) => new Date(a.month) - new Date(b.month));

  return combinedData;
};

export default {
  getTotalDonationForProject,
  getProjectsCreatedPerMonth,
};

import Project from '../model/project.js';
import Donation from '../model/donation.js';
import axios from 'axios';
const TeamAPath = process.env.TEAM_A_API_GATEWAY;

/**
 * Get the count of projects created per month within a specified time range.
 * @param {String} startMonth - The start month in 'YYYY-MM' format.
 * @param {String} endMonth - The end month in 'YYYY-MM' format.
 * @returns {Array} Monthly project count data within the specified range.
 */
 const getProjectsCreatedPerMonth = async (queryParams) => {
  try {
    const { startMonth, endMonth } = queryParams;
    // Fetch all projects
    const response = await axios.get(`${TeamAPath}project`); // Assuming this endpoint fetches all projects
    const allProjects = response.data;

    // Filter projects within the specified time range
    const filteredProjects = allProjects.filter((project) => {
      const projectMonth = new Date(project.createdAt).toISOString().slice(0, 7); // Extract 'YYYY-MM'
      return projectMonth >= startMonth && projectMonth <= endMonth;
    });

    // Aggregate projects by month
    const aggregatedData = filteredProjects.reduce((acc, project) => {
      const month = new Date(project.createdAt).toISOString().slice(0, 7); // Extract 'YYYY-MM'
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Convert aggregated data into a sorted array
    const result = Object.entries(aggregatedData)
      .map(([month, count], index) => ({
        id: index,
        month, // 'YYYY-MM'
        projectCount: count,
      }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    return result;
  } catch (error) {
    console.error('Error fetching projects created per month:', error);
    throw error;
  }
};

/**
 * Get the distribution of projects by country by fetching all projects and aggregating locally.
 * @returns {Array} Pie chart data for projects by country.
 */
const getProjectsByCountry = async () => {
  try {
    // Fetch all projects from the API
    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || []; // Extract projectResponse array
    console.log("All projects:", allProjects);
    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    // Aggregate projects by country
    const aggregatedData = allProjects.reduce((acc, project) => {
      if (project.country) { // Ensure project has a country field
        acc[project.country] = (acc[project.country] || 0) + 1;
      }
      return acc;
    }, {});

    // Format aggregated data for output
    const result = Object.entries(aggregatedData).map(([country, count], index) => ({
      id: index,
      value: count,
      label: country,
    }));

    console.log("Projects by country:", result);

    return result;
  } catch (error) {
    console.error("Error fetching projects by country:", error.message);
    throw error; // Re-throw error to ensure proper error handling
  }
};

/**
 * Get the distribution of projects by category by fetching all projects and aggregating locally.
 * @returns {Array} Pie chart data for projects by category.
 */
const getProjectsByCategory = async () => {
  try {
    // Fetch all projects from the API
    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || []; // Extract projectResponse array
    console.log("All projects:", allProjects);

    // Validate the response to ensure it's an array
    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    // Aggregate projects by category
    const aggregatedData = allProjects.reduce((acc, project) => {
      if (project.category) { // Ensure project has a category field
        acc[project.category] = (acc[project.category] || 0) + 1;
      }
      return acc;
    }, {});

    // Format aggregated data for output
    const result = Object.entries(aggregatedData).map(([category, count], index) => ({
      id: index,
      value: count,
      label: category,
    }));

    console.log("Projects by category:", result);

    return result;
  } catch (error) {
    console.error("Error fetching projects by category:", error.message);
    throw error; // Re-throw error to ensure proper error handling
  }
};

const getProjectsByMonth = async (startMonth, endMonth) => {
  try {
    // Validate and parse startMonth and endMonth
    if (!startMonth || !endMonth) {
      throw new Error("startMonth and endMonth are required");
    }
    console.log("Start Month:", startMonth);
    console.log("End Month:", endMonth);    
    const start = new Date(`${startMonth}-01`);
    const end = new Date(`${endMonth}-01`);
    console.log("Parsed Start Date:", start);
    console.log("Parsed End Date:", end);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid startMonth or endMonth format. Expected YYYY-MM.");
    }

    if (start > end) {
      throw new Error("startMonth cannot be after endMonth.");
    }

    // Fetch all projects from the API
    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || []; // Extract projectResponse array
    console.log("All projects:", allProjects);

    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    // Aggregate projects by month
    const aggregatedData = allProjects.reduce((acc, project) => {
      const projectMonth = new Date(project.start_date).toISOString().slice(0, 7); // Extract YYYY-MM
      if (!acc[projectMonth]) {
        acc[projectMonth] = 0;
      }
      acc[projectMonth] += 1;
      return acc;
    }, {});

    console.log("Aggregated data:", aggregatedData);

    // Generate all months in the range
    const allMonths = generateMonthsInRange(startMonth, endMonth);

    // Map aggregated data to include all months with missing months set to 0
    const result = allMonths.map((month, index) => ({
      id: index,
      month, // Month in YYYY-MM format
      projectCount: aggregatedData[month] || 0, // Use count or default to 0
    }));

    console.log("Complete project data by month:", result);

    return result;
  } catch (error) {
    console.error("Error in getProjectsByMonth:", error.message);
    throw error; // Re-throw error for higher-level handling
  }
};

/**
 * Generate a list of all months between startMonth and endMonth (inclusive).
 * @param {String} startMonth - The starting month in 'YYYY-MM' format.
 * @param {String} endMonth - The ending month in 'YYYY-MM' format.
 * @returns {Array} - List of months in YYYY-MM format.
 */
const generateMonthsInRange = (startMonth, endMonth) => {
  const start = new Date(`${startMonth}-01`);
  const end = new Date(`${endMonth}-01`);
  const months = [];

  while (start <= end) {
    months.push(start.toISOString().slice(0, 7)); // Format as YYYY-MM
    start.setMonth(start.getMonth() + 1); // Increment by 1 month
  }

  return months;
};


export {
  getProjectsCreatedPerMonth,
  getProjectsByCountry,
  getProjectsByCategory,
  getProjectsByMonth,
};

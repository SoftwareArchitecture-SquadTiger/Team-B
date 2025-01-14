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
    const response = await axios.get(`${TeamAPath}project`);
    const allProjects = response.data;

    const filteredProjects = allProjects.filter((project) => {
      const projectMonth = new Date(project.createdAt).toISOString().slice(0, 7);
      return projectMonth >= startMonth && projectMonth <= endMonth;
    });

    const aggregatedData = filteredProjects.reduce((acc, project) => {
      const month = new Date(project.createdAt).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(aggregatedData)
      .map(([month, count], index) => ({
        id: index,
        month,
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

    const allProjects = response.data?.projectResponse || [];
    console.log("All projects:", allProjects);
    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    const aggregatedData = allProjects.reduce((acc, project) => {
      if (project.country) { 
        acc[project.country] = (acc[project.country] || 0) + 1;
      }
      return acc;
    }, {});

    const result = Object.entries(aggregatedData).map(([country, count], index) => ({
      id: index,
      value: count,
      label: country,
    }));

    console.log("Projects by country:", result);

    return result;
  } catch (error) {
    console.error("Error fetching projects by country:", error.message);
    throw error; 
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

    const allProjects = response.data?.projectResponse || []; 
    console.log("All projects:", allProjects);

    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    const aggregatedData = allProjects.reduce((acc, project) => {
      if (project.category) { // Ensure project has a category field
        acc[project.category] = (acc[project.category] || 0) + 1;
      }
      return acc;
    }, {});

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

    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || []; 
    console.log("All projects:", allProjects);

    if (!Array.isArray(allProjects)) {
      throw new Error("Invalid response: Expected an array of projects");
    }

    const aggregatedData = allProjects.reduce((acc, project) => {
      const projectMonth = new Date(project.start_date).toISOString().slice(0, 7); 
      if (!acc[projectMonth]) {
        acc[projectMonth] = 0;
      }
      acc[projectMonth] += 1;
      return acc;
    }, {});

    console.log("Aggregated data:", aggregatedData);

    const allMonths = generateMonthsInRange(startMonth, endMonth);

    const result = allMonths.map((month, index) => ({
      id: index,
      month, 
      projectCount: aggregatedData[month] || 0, 
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

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

    console.debug(`[getProjectsCreatedPerMonth] Fetching all projects from: ${TeamAPath}project`);
    const response = await axios.get(`${TeamAPath}project`);
    const allProjects = response.data;

    console.debug(`[getProjectsCreatedPerMonth] Total projects fetched: ${allProjects.length}`);

    const filteredProjects = allProjects.filter((project) => {
      const projectMonth = new Date(project.createdAt).toISOString().slice(0, 7);
      return projectMonth >= startMonth && projectMonth <= endMonth;
    });

    console.debug(`[getProjectsCreatedPerMonth] Projects within date range (${startMonth} to ${endMonth}): ${filteredProjects.length}`);

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

    console.debug(`[getProjectsCreatedPerMonth] Aggregated project data:`, result);

    return result;
  } catch (error) {
    console.error(`[getProjectsCreatedPerMonth] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Get the distribution of projects by country.
 * @returns {Array} Pie chart data for projects by country.
 */
const getProjectsByCountry = async () => {
  try {
    console.debug(`[getProjectsByCountry] Fetching all projects from: ${TeamAPath}projects`);
    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || [];
    console.debug(`[getProjectsByCountry] Total projects fetched: ${allProjects.length}`);

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

    console.debug(`[getProjectsByCountry] Aggregated data:`, result);

    return result;
  } catch (error) {
    console.error(`[getProjectsByCountry] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Get the distribution of projects by category.
 * @returns {Array} Pie chart data for projects by category.
 */
const getProjectsByCategory = async () => {
  try {
    console.debug(`[getProjectsByCategory] Fetching all projects from: ${TeamAPath}projects`);
    const response = await axios.get(`${TeamAPath}projects`, {
      headers: { 'internal-api': process.env.INTERNAL_API_KEY },
    });

    const allProjects = response.data?.projectResponse || [];
    console.debug(`[getProjectsByCategory] Total projects fetched: ${allProjects.length}`);

    const aggregatedData = allProjects.reduce((acc, project) => {
      if (project.category) {
        acc[project.category] = (acc[project.category] || 0) + 1;
      }
      return acc;
    }, {});

    const result = Object.entries(aggregatedData).map(([category, count], index) => ({
      id: index,
      value: count,
      label: category,
    }));

    console.debug(`[getProjectsByCategory] Aggregated data:`, result);

    return result;
  } catch (error) {
    console.error(`[getProjectsByCategory] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Get the distribution of projects by month within a range.
 * @param {String} startMonth - Start month in 'YYYY-MM'.
 * @param {String} endMonth - End month in 'YYYY-MM'.
 * @returns {Array} Monthly project distribution data.
 */
const getProjectsByMonth = async (startMonth, endMonth) => {
  try {
    console.debug(`[getProjectsByMonth] Start Month: ${startMonth}, End Month: ${endMonth}`);
    
    const start = new Date(`${startMonth}-01`);
    const end = new Date(`${endMonth}-01`);
    
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
    console.debug(`[getProjectsByMonth] Total projects fetched: ${allProjects.length}`);

    const aggregatedData = allProjects.reduce((acc, project) => {
      const projectMonth = new Date(project.start_date).toISOString().slice(0, 7);
      acc[projectMonth] = (acc[projectMonth] || 0) + 1;
      return acc;
    }, {});

    const allMonths = generateMonthsInRange(startMonth, endMonth);
    const result = allMonths.map((month, index) => ({
      id: index,
      month,
      projectCount: aggregatedData[month] || 0,
    }));

    console.debug(`[getProjectsByMonth] Final data:`, result);

    return result;
  } catch (error) {
    console.error(`[getProjectsByMonth] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Generate all months between a range.
 * @param {String} startMonth - Starting month (YYYY-MM).
 * @param {String} endMonth - Ending month (YYYY-MM).
 * @returns {Array} List of months in YYYY-MM format.
 */
const generateMonthsInRange = (startMonth, endMonth) => {
  const start = new Date(`${startMonth}-01`);
  const end = new Date(`${endMonth}-01`);
  const months = [];

  while (start <= end) {
    months.push(start.toISOString().slice(0, 7));
    start.setMonth(start.getMonth() + 1);
  }

  return months;
};

export {
  getProjectsCreatedPerMonth,
  getProjectsByCountry,
  getProjectsByCategory,
  getProjectsByMonth,
};

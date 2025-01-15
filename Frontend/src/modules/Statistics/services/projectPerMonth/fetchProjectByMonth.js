import { fetchProjectsByMonth } from "../../hooks/projectPerMonth/callProjectByMonth";
export const fetchChartData = async (startMonth, endMonth) => {
  try {
    const jsonResponse = await fetchProjectsByMonth(startMonth, endMonth); // Fetch raw data from the API

    // Transform the API response to match the BarChart data structure
    const formattedData = jsonResponse.data.map((item) => ({
      project: item.projectCount,
      month: item.month,
    }));

    return formattedData; // Return the formatted data
  } catch (error) {
    console.error("Error in fetchChartData:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

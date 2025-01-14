import { fetchDonationsByMonth } from "../../hooks/amountPerMonth/callDonationByMonth";

export const fetchDonationChartData = async (startMonth, endMonth) => {
  try {
    const jsonResponse = await fetchDonationsByMonth(startMonth, endMonth); // Fetch raw data from the API

    // Transform the API response to match the LineChart data structure
    const months = jsonResponse.data.map((item) => item.month);

    const amounts = jsonResponse.data.map((item) => item.totalAmount);

    return { months, amounts }; // Return formatted data for the chart
  } catch (error) {
    console.error("Error in fetchDonationChartData:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

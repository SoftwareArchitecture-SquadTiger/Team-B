import { fetchDonationDataByDay } from "../../hooks/amountByDay/callDonationByDayApi";
import { getLast12Days } from "./dateUtils";

export const handleFetchDonationData = async () => {
  const last12Days = getLast12Days();
  const startDate = last12Days[0];
  const endDate = last12Days[last12Days.length - 1];

  // Fetch data from the API
  const jsonResponse = await fetchDonationDataByDay(startDate, endDate);

  // Format data for the chart
  const formattedAmounts = last12Days.map((day) => {
    const dataForDay = jsonResponse.data.find((item) => item.date === day);
    return dataForDay ? dataForDay.totalAmount : 0; // Default to 0 if no data
  });

  const formattedDates = last12Days.map((date, index) => {
    if (index === last12Days.length - 1) {
      return "Today"; // Replace the last date with "Today"
    }
    const dateObj = new Date(date);
    return `${dateObj.getDate()} ${dateObj.toLocaleString("default", { month: "short" })}`; // Format: "Day Mon"
  });

  return { formattedDates, formattedAmounts };
};

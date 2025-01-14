import { fetchProjectsByCountry } from "../../hooks/projectByCountry/callProjectByCountry";

export const fetchCountryData = async () => {
  try {
    const jsonResponse = await fetchProjectsByCountry(); // Fetch the raw data from the API

    // Transform the API response to fit the PieChart data structure
    const formattedData = jsonResponse.data.map((item) => ({
      id: item.id, // Unique identifier
      value: item.value, // Project count
      label: item.label, // Country name
    }));

    return formattedData; // Return the formatted data
  } catch (error) {
    console.error("Error in fetchCountryData:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

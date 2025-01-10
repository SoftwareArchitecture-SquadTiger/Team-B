import { FILTER_CHARITY_BY_COUNTRY } from "../../../../services/BackendUrlConfig";

export const filterCharitiesByCountry = async (country) => {
  try {
    const response = await fetch(`${FILTER_CHARITY_BY_COUNTRY}${country}`, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Request JSON response
        "Content-Type": "application/json", // Content type for the request
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to filter charities by country: ${response.statusText}`);
    }

    const charitiesData = await response.json();
    console.log("Filtered Charities Data:", charitiesData); // Debug log
    return charitiesData.data || []; // Ensure fallback
  } catch (error) {
    console.error("Error filtering charities by country:", error.message);
    throw error;
  }
};

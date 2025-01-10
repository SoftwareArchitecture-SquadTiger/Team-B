import { FILTER_DONOR_BY_COUNTRY } from "../../../../services/BackendUrlConfig";

export const filterDonorsByCountry = async (country) => {
  try {
    const response = await fetch(`${FILTER_DONOR_BY_COUNTRY}${country}`, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Request JSON response
        "Content-Type": "application/json", // Content type for the request
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to filter donors by country: ${response.statusText}`);
    }

    const donorsData = await response.json();
    console.log("Filtered Donors Data by Country:", donorsData); // Debug log
    return donorsData.data || []; // Ensure fallback
  } catch (error) {
    console.error("Error filtering donors by country:", error.message);
    throw error;
  }
};

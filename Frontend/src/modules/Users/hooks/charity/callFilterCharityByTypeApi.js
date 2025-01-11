import { FILTER_CHARITY_BY_TYPE } from "../../../../services/BackendUrlConfig";

export const filterCharitiesByType = async (type) => {
  try {
    const response = await fetch(`${FILTER_CHARITY_BY_TYPE}${type}`, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Request JSON response
        "Content-Type": "application/json", // Content type for the request
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to filter charities by type: ${response.statusText}`);
    }

    const charitiesData = await response.json();
    console.log("Filtered Charities Data by Type:", charitiesData); // Debug log
    return charitiesData.data || []; // Ensure fallback
  } catch (error) {
    console.error("Error filtering charities by type:", error.message);
    throw error;
  }
};

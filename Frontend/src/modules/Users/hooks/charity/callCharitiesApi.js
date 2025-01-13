import { GET_CHARITIES_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callCharitiesApi() {
  try {
    const charitiesResponse = await fetch(GET_CHARITIES_SERVICE_URL, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Accept JSON response
        "Content-Type": "application/json", // Content type
      },
      credentials: "include", // Include credentials
    });

    if (!charitiesResponse.ok) {
      throw new Error(`Failed to fetch charities: ${charitiesResponse.statusText}`);
    }

    const charitiesData = await charitiesResponse.json();

    console.log("Charities Data:", charitiesData); // Debug log

    return {
      charitiesData: charitiesData.data || [], // Ensure fallback
    };
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

export default callCharitiesApi;
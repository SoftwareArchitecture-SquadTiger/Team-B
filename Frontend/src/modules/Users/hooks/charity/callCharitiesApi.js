import { GET_CHARITIES_SERVICE_URL } from "../../../../services/BackendUrlConfig";
import { useAPI } from "../../../../state/APIContext";

async function callCharitiesApi() {
  const {fetchWithAuth} = useAPI();
  try {
    const charitiesResponse = await fetchWithAuth(GET_CHARITIES_SERVICE_URL, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Accept JSON response
        "Content-Type": "application/json", // Content type
      },
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

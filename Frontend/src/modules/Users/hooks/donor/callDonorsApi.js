import { GET_DONORS_SERVICE_URL } from "../../../../services/BackendUrlConfig";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

async function callDonorsApi() {
  try {
    const donorsResponse = await fetchWithAuth(GET_DONORS_SERVICE_URL, {
      method: "GET", // HTTP method
    });

    if (!donorsResponse.ok) {
      throw new Error(`Failed to fetch donors: ${donorsResponse.statusText}`);
    }

    const donorsData = await donorsResponse.json();

    console.log("Donors Data:", donorsData); // Debug log

    return {
      donorsData: donorsData.data || [], // Ensure fallback
    };
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

export default callDonorsApi;

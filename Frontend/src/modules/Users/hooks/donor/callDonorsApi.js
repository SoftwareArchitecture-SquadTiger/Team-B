import { GET_DONORS_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callDonorsApi() {
  try {
    const donorsResponse = await fetch(GET_DONORS_SERVICE_URL, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Request JSON response
        "Content-Type": "application/json", // Content type for the request
      },
      credentials: "include", // Include credentials
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

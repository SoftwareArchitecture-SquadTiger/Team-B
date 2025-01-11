import { GET_DONORS_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callDonorsApi() {
  try {
    const donorsResponse = await fetch(GET_DONORS_SERVICE_URL, {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json", // Request JSON response
        "Content-Type": "application/json", // Content type for the request
      },
    });

    if (!donorsResponse.ok) {
      throw new Error(`Failed to fetch donors: ${donorsResponse.statusText}`);
    }

    const donorsData = await donorsResponse.json();

    // Debug log for fetched data
    console.log("Donors Data:", donorsData);

    // Format data to include Cloudinary image URLs (optional if already provided in `img_url`)
    const formattedDonors = (donorsData.data || []).map((donor) => ({
      ...donor,
      img_url: donor.img_url || null, // Ensure `img_url` is set or null
    }));

    return {
      donorsData: formattedDonors, // Return formatted data
    };
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

export default callDonorsApi;

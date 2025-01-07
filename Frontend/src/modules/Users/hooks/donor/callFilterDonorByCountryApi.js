import { FILTER_DONOR_BY_COUNTRY } from "../../../../services/BackendUrlConfig";

export const filterDonorsByCountry = async (country) => {
  try {
    const response = await fetch(`${FILTER_DONOR_BY_COUNTRY}${country}`);
    if (!response.ok) throw new Error("Failed to filter donors");
    const donorsData = await response.json();
    console.log(donorsData)
    return donorsData.data || [];
  } catch (error) {
    console.error("Error filtering donors:", error.message);
    throw error;
  }
};

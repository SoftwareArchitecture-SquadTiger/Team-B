import { FILTER_CHARITY_BY_COUNTRY } from "../../../../services/BackendUrlConfig";

export const filterCharitiesByCountry = async (country) => {
    try {
      const response = await fetch(`${FILTER_CHARITY_BY_COUNTRY}${country}`);
      if (!response.ok) throw new Error("Failed to filter charities by country");
      const charitiesData = await response.json();
      console.log(charitiesData)
      return charitiesData.data || [];
    } catch (error) {
      console.error("Error filtering charities by country:", error.message);
      throw error;
    }
  };
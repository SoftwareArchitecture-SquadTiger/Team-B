import { filterCharitiesByCountry } from "../hooks/charity/callFilterCharityByCountryApi";
import { filterCharitiesByType } from "../hooks/charity/callFilterCharityByTypeApi";
import { filterDonorsByCountry } from "../hooks/donor/callFilterDonorByCountryApi";

export const handleFilterDonorByCountry = async (country, setDonors) => {
  try {
    const filteredDonors = await filterDonorsByCountry(country);
    setDonors(filteredDonors);
  } catch (error) {
    console.error("Error handling donor filter by country:", error.message);
  }
};

export const handleFilterCharityByCountry = async (country, setCharities) => {
  try {
    const filteredCharities = await filterCharitiesByCountry(country);
    setCharities(filteredCharities);
  } catch (error) {
    console.error("Error handling charity filter by country:", error.message);
  }
};

export const handleFilterCharityByType = async (type, setCharities) => {
  try {
    const filteredCharities = await filterCharitiesByType(type);
    setCharities(filteredCharities);
  } catch (error) {
    console.error("Error handling charity filter by type:", error.message);
  }
};

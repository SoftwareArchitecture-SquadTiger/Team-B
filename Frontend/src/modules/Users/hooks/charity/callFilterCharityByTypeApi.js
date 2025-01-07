import { FILTER_CHARITY_BY_TYPE } from "../../../../services/BackendUrlConfig";

export const filterCharitiesByType = async (type) => {
  try {
    const response = await fetch(`${FILTER_CHARITY_BY_TYPE}${type}`);
    if (!response.ok) throw new Error("Failed to filter charities by type");
    const charitiesData = await response.json();
    console.log(charitiesData)
    return charitiesData.data || [];
  } catch (error) {
    console.error("Error filtering charities by type:", error.message);
    throw error;
  }
};

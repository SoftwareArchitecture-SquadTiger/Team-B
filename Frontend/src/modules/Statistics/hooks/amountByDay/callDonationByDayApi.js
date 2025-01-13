import { GET_AMOUNT_BY_DAY } from "../../../../services/BackendUrlConfig";
export const fetchDonationDataByDay = async (startDate, endDate) => {
    const API_URL = `${GET_AMOUNT_BY_DAY}?startDate=${startDate}&endDate=${endDate}`;
  
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  
    return await response.json(); // Return the parsed JSON response
  };
  
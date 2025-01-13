import { GET_AMOUNT_BY_MONTH } from "../../../../services/BackendUrlConfig";
export const fetchDonationsByMonth = async (startMonth, endMonth) => {
    const API_URL = `${GET_AMOUNT_BY_MONTH}?startMonth=${startMonth}&endMonth=${endMonth}`;
  
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  
    return await response.json(); // Return the parsed JSON response
  };
  
import { GET_PROJECT_BY_MONTH } from "../../../../services/BackendUrlConfig";
export const fetchProjectsByMonth = async (startMonth, endMonth) => {
    const API_URL = `${GET_PROJECT_BY_MONTH}?startMonth=${startMonth}&endMonth=${endMonth}`;
  
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  
    return await response.json(); // Return the parsed JSON response
  };
  
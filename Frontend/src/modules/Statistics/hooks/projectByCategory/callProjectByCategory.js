import { GET_PROJECT_BY_CATEGORY } from "../../../../services/BackendUrlConfig";
export const fetchProjectsByCategory = async () => {
    const API_URL = GET_PROJECT_BY_CATEGORY;
  
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
  
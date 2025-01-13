import { GET_CHARITIES_SERVICE_URL } from "../../../services/BackendUrlConfig";

export const callCharityAPI  = async () => {
  try {
    const response = await fetch(GET_CHARITIES_SERVICE_URL,{
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json(); // Parse response JSON
    return data.data.length;
  } catch (error) {
    console.error("Error fetching charities:", error);
    return 0;
  }
};

import { ADD_CHARITY_SERVICE_URL } from "../../../../services/BackendUrlConfig";

export const createCharityApi = async (payload) => {
    try {
      const response = await fetch(ADD_CHARITY_SERVICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create charity");
      }
  
      return await response.json(); // Return response data
    } catch (error) {
      throw error; // Propagate error for handling
    }
  };
  
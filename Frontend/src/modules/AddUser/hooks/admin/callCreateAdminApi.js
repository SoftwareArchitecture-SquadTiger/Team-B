import { ADD_ADMIN_SERVICE_URL } from "../../../../services/BackendUrlConfig";

export const createAdminApi = async (userData) => {
    try {
      const response = await fetch(ADD_ADMIN_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData), // Send user data in the request body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
  
      const responseData = await response.json();
      return responseData; // Return the response data
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw error; // Propagate error for the caller to handle
    }
  };
  
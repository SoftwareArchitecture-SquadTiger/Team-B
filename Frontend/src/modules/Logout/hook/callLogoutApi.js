import { ADMIN_LOGOUT_URL } from "../../../services/BackendUrlConfig";

export const logoutUser = async () => {
    try {
      const response = await fetch(ADMIN_LOGOUT_URL, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }
  
      return { status: "success" };
    } catch (error) {
      throw error; 
    }
  };
  
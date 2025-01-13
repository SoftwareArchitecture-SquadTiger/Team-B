import { VALIDATE_TOKEN_URL } from "./BackendUrlConfig";

export const validateUser = async (navigate) => {
    try {
      const response = await fetch(VALIDATE_TOKEN_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });
  
      if (response.status === 401) {
        console.log("Unauthorized. Redirecting to login.");
        navigate("/login"); 
        return null;
      }
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("User is authenticated:", data.user);
  
      return data; 
    } catch (error) {
      console.error("Error validating user:", error.message);
      return null;
    }
  };
  
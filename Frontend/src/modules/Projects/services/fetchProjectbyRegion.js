export const fetchProjectByRegion = async (region) => {
    const baseUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/region`; // Update the base URL based on your environment variables
  
    try {
      const response = await fetch(`${baseUrl}/${encodeURIComponent(region)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching projects by region: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Fetched region data:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error in fetchProjectByRegion:", error);
      throw error;
    }
  };
  
export const fetchProjectsByStatus = async (status) => {
    const baseUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/status`;
    try {
      const response = await fetch(`${baseUrl}/${status}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch projects by status: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchProjectsByStatus:", error);
      throw error;
    }
  };
  
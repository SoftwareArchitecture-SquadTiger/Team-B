export const updateProjectStatusAPI = async (id, status) => {
    const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/update/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status }), // Pass the updated status
      });
      if (!response.ok) {
        throw new Error(`Failed to update project status: ${response.statusText}`);
      }
      return await response.json(); // Return the API response
    } catch (error) {
      console.error("Error in updateProjectStatusAPI:", error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };
  
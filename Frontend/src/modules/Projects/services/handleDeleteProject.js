export const handleDeleteProject = async (id) => {
  const baseUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/delete`;
  try {
    console.log(`Sending DELETE request to: ${baseUrl}/${id}`);
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete project:", errorData);
      throw new Error(`Delete failed with status: ${response.status}`);
    }

    console.log("Project deleted successfully.");
    return true; // Indicate success explicitly
  } catch (error) {
    console.error("Error in handleDeleteProject:", error);
    throw error;
  }
};

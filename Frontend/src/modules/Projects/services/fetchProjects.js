export const fetchProjectById = async (id) => {
  const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/${id}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching project by ID: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched project by ID:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error in fetchProjectById:", error);
    throw error;
  }
};



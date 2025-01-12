export const fetchProjectByTitle = async (title) => {
  const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/title/${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching project by title: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched project by title:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error in fetchProjectByTitle:", error);
    throw error;
  }
};

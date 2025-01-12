const url = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;

export const callDonorAPI  = async () => {
  try {
    const response = await fetch(`${url}/admin-server/donors`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json(); // Parse response JSON
    return data.data.length;
  } catch (error) {
    console.error("Error fetching donors:", error);
    return 0;
  }
};

import axios from "axios";

export const fetchProjectsAPI = async () => {
  const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/projects`;
  console.log("API URL:", apiUrl); // Debugging the API URL
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log("Fetched response:", response.data); // Check the actual response
    if (!response.data.projectResponse) throw new Error("Unexpected response format");
    return response.data;
  } catch (error) {
    console.error("Error in fetchProjectsAPI:", error);
    throw error;
  }
};




const response = await axios.get(`http://192.168.20.6:5000/client-server/projects`);



export const deleteProjectAPI = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/delete/${id}`
  );
  return response.data;
};

export const updateProjectStatusAPI = async (id, status) => {
  const response = await axios.put(
    `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/update/${id}`,
    { status }
  );
  return response.data;
};
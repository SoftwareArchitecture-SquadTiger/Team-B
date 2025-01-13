import axios from "axios";

export const createProjectAPI = async (projectData) => {
  const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/create`;
  const response = await axios.post(apiUrl, projectData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

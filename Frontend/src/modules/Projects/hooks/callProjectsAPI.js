import axios from "axios";
import { handleDeleteProject } from "../services/handleDeleteProject";

const BASE_URL = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server`;

// Fetch Projects API
export const fetchProjectsAPI = async () => {
  const apiUrl = `${BASE_URL}/projects`;
  console.log("API URL:", apiUrl); // Debugging the API URL
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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





// Update Project Status API
export const updateProjectStatusAPI = async (id, status) => {
  const apiUrl = `${BASE_URL}/project/update/${id}`;
  console.log("Updating project status:", apiUrl, "with status:", status); // Debugging
  try {
    const response = await axios.put(
      apiUrl,
      { status },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Updated project status response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updateProjectStatusAPI:", error);
    throw error;
  }
};

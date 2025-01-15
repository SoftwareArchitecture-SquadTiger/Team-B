import { fetchProjectsByCategory } from "../../hooks/projectByCategory/callProjectByCategory";

export const fetchCategoryData = async () => {
  try {
    const jsonResponse = await fetchProjectsByCategory(); // Call the API utility
    return jsonResponse.data; // Return only the `data` field
  } catch (error) {
    console.error("Error in fetchCategoryData:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

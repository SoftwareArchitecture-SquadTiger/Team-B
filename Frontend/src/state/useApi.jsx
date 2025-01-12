import { useAPI } from "./APIContext";

export const useApi = () => {
  const { authToken } = useAPI(); // Access the token from APIContext

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`, // Include the token in the headers
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response.json();
  };

  return { fetchWithAuth };
};

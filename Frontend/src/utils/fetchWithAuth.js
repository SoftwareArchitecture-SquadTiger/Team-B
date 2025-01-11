// fetchWithAuth.js
export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("authToken"); // Retrieve the JWE from localStorage
  
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
  
    // Add Authorization header if the token exists
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  
    const mergedOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers, // Merge with any custom headers passed in options
      },
    };
  
    const response = await fetch(url, mergedOptions);
  
    // Optionally handle token expiration or other errors
    if (response.status === 401) {
      console.error("Unauthorized - Token might be expired or invalid");
      // Handle logout or refresh token logic here
    }
  
    return response;
  };
  
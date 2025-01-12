import React, { createContext, useContext, useState } from "react";

// Create the context
const APIContext = createContext();

// Create a provider component
export const APIProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  
  const saveToken = (token) => {
    setAuthToken(token);
  };

  const clearToken = () => {
    setAuthToken(null);
  };

  return (
    <APIContext.Provider value={{ authToken, saveToken, clearToken }}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook to use the context
export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};

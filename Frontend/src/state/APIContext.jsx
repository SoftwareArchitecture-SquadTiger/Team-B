import React, { createContext, useContext, useState } from "react";

// Create the context
const APIContext = createContext();

// Create a provider component
export const APIProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null); // Store API data like `dataToSend`

  // Function to update the context
  const updateApiData = (data) => {
    setApiData(data);
  };

  return (
    <APIContext.Provider value={{ apiData, updateApiData }}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook to use the context
export const useAPI = () => useContext(APIContext);

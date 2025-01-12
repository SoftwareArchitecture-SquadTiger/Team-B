import { useState, useEffect } from "react";
import { GET_CHARITIES_SERVICE_URL } from "../../../services/BackendUrlConfig";

export const useCharities = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await fetch(GET_CHARITIES_SERVICE_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const { data } = await response.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error.message);
      }
    };

    fetchCharities();
  }, []);

  return charities;
};

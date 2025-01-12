import { useState } from "react";

export const useRegionCountries = () => {
  const regionsWithCountries = {
    "North America": ["United States", "Canada", "Mexico"],
    Europe: ["United Kingdom", "Germany", "France"],
    Asia: ["China", "Japan", "India"],
    "Southeast Asia": ["Vietnam", "Thailand", "Indonesia"],
  };

  const [filteredCountries, setFilteredCountries] = useState([]);

  const updateFilteredCountries = (region) => {
    setFilteredCountries(regionsWithCountries[region] || []);
  };

  return { filteredCountries, updateFilteredCountries, regionsWithCountries };
};

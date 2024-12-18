import React, { useState, useEffect } from "react";
import { fetchCountCharities } from "../services/fetchCountCharity";

const CharitiesCard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCharityCount = async () => {
      const charityCount = await fetchCountCharities();
      setCount(charityCount);
    };

    getCharityCount();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center w-full sm:w-56">
      <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Charities</h1>
      <p className="text-3xl font-medium text-black">{count}</p>
    </div>
  );
};
export default CharitiesCard;

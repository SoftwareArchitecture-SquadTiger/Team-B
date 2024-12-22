import React from "react";
import useCharityCount from "../services/fetchCountCharity";

const CharityCard = () => {
  const count = useCharityCount(); // Use the hook to get charity count

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center mb-12 w-full sm:w-56">
      <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Charitys</h1>
      <p className="text-3xl font-medium text-black">{count}</p>
    </div>
  );
};

export default CharityCard;

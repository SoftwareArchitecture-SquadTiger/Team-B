import React from "react";
import useDonorCount from "../services/fetchCountDonor";

const DonorCard = () => {
  const count = useDonorCount(); // Use the hook to get donor count

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center mb-12 w-full sm:w-56">
      <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Donors</h1>
      <p className="text-3xl font-medium text-black">{count}</p>
    </div>
  );
};

export default DonorCard;

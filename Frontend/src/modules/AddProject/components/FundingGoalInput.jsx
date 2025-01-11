import React from "react";

const FundingGoalInput = ({ name, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        Funding Goal
      </label>
      <input
        type="number"
        id={name}
        name={name}
        placeholder="Enter funding goal (e.g., $5000)"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
        required={required}
        step="1" // Allow granular input by keyboard
        min="0" // Restrict only negative values
        onWheel={(e) => e.target.blur()} // Disable scroll wheel increment
      />
    </div>
  );
};

export default FundingGoalInput;

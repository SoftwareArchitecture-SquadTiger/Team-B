import React from "react";

const FundingGoalInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Funding Goal</label>
      <input
        type="number"
        name="goal"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder="Enter funding goal (e.g., $5000)"
        required
      />
    </div>
  );
};

export default FundingGoalInput;


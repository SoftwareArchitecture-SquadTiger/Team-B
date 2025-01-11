import React from "react";

const CountrySelector = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Country</label>
      <select
        name="country"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        <option value="Global">Global</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Australia">Australia</option>
      </select>
    </div>
  );
};

export default CountrySelector;

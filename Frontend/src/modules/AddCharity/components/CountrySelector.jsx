import React from "react";

const CountrySelector = ({ id, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        Country
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
      >
        <option>Vietnam</option>
        <option>USA</option>
        <option>Germany</option>
      </select>
    </div>
  );
};

export default CountrySelector;

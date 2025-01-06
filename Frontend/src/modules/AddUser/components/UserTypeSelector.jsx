import React from "react";

const UserTypeSelector = ({ value, onChange }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <select
        value={value}
        onChange={onChange}
        className="text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none"
      >
        <option value="Charity User">Charity User</option>
        <option value="Donor User">Donor User</option>
      </select>
    </div>
  );
};

export default UserTypeSelector;

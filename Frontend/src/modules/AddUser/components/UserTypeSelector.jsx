import React from "react";

const UserTypeSelector = ({ value, onChange }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded p-2"
      >
        <option value="Charity User">Charity User</option>
        <option value="Donor User">Donor User</option>
      </select>
    </div>
  );
};

export default UserTypeSelector;

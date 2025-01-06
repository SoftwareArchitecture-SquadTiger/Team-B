import React from "react";

const FilterProject = ({ onRegionChange, onStatusChange }) => {
  const handleRegionChange = (event) => {
    const region = event.target.value;
    console.log("Region changed to:", region); // Debugging
    onRegionChange(region); // Call the region change handler
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    console.log("Status changed to:", status); // Debugging
    onStatusChange(status); // Call the status change handler
  };

  return (
    <div className="flex gap-4">
      {/* Region Dropdown */}
      <select onChange={handleRegionChange} className="border border-gray-300 rounded p-2">
        <option value="All Regions">All Regions</option>
        <option value="North America">North America</option>
        <option value="Southeast Asia">Southeast Asia</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
      </select>

      {/* Status Dropdown */}
      <select onChange={handleStatusChange} className="border border-gray-300 rounded p-2">
        <option value="All Status">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Running">Running</option>
        <option value="Halted">Halted</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterProject;

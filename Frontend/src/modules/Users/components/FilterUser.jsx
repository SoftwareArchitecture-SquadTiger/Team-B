import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterUser = ({ showDropdown, onFilterClick, onSelectRole }) => (
  <div className="relative">
    <button
      onClick={onFilterClick}
      className="px-4 py-2 bg-white text-pink-500 rounded flex items-center gap-2 border border-pink-500"
    >
      <FilterListIcon /> Filters
    </button>
    {showDropdown && (
      <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded shadow-lg z-10">
        {["", "ADMIN", "DONOR", "CHARITY"].map((role, index) => (
          <div
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectRole(role)}
          >
            {role || "All"}
          </div>
        ))}
      </div>
    )}
  </div>
);



export default FilterUser;

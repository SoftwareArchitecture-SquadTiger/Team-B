import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, onSearch }) => (
  <div className="relative flex-1">
    <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
    <input
      type="text"
      placeholder="Search the UserID, Username..."
      value={searchQuery}
      onChange={onSearch}
      className="w-full p-2 pl-10 border border-gray-300 rounded"
    />
  </div>
);

export default SearchBar;

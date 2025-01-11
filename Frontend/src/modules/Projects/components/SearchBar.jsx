import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ searchQuery, onSearch }) => (
  <div className="relative flex-1">
    <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
    <input
      type="text"
      placeholder="Search the Project ID..."
      value={searchQuery} // Controlled value
      onChange={onSearch} // Updates the state
      className="w-full p-2 pl-10 border border-gray-300 rounded"
    />
  </div>
);

 export default SearchBar;

// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";

// const SearchBar = ({ searchQuery, onSearch }) => (
//   <div className="relative flex-1">
//     <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
//     <input
//       type="text"
//       placeholder="Search the Project ID..."
//       value={searchQuery || ""}
//       onChange={(e) => onSearch(e.target.value)} // Update search query
//       className="w-full p-2 pl-10 border border-gray-300 rounded"
//     />
//   </div>
// );

// export default SearchBar;
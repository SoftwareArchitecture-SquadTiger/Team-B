import React, { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role filter
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // State to show/hide filter dropdown

  const users = [
    { id: "ADM001", name: "Admin", role: "ADMIN", email: "admin@gmail.com", country: "Vietnam", type: "-" },
    { id: "DOR001", name: "Dornor 1", role: "DORNOR", email: "dornor1@gmail.com", country: "Germany", type: "-" },
    { id: "DOR001", name: "Dornor 2", role: "DORNOR", email: "dornor2@gmail.com", country: "China", type: "-" },
    { id: "CHA001", name: "Charity 1", role: "CHARITY", email: "charity1@gmail.com", country: "South Africa", type: "Individual" },
    { id: "CHA001", name: "Charity 2", role: "CHARITY", email: "charity2@gmail.com", country: "Australia", type: "Non-profit" },
    { id: "DOR002", name: "Dornor 3", role: "DORNOR", email: "dornor3@gmail.com", country: "USA", type: "-" },
    { id: "CHA002", name: "Charity 3", role: "CHARITY", email: "charity3@gmail.com", country: "UK", type: "Non-profit" },
    { id: "CHA003", name: "Charity 4", role: "CHARITY", email: "charity4@gmail.com", country: "India", type: "Individual" },
    { id: "CHA004", name: "Charity 5", role: "CHARITY", email: "charity5@gmail.com", country: "Canada", type: "Non-profit" },
    { id: "CHA005", name: "Charity 6", role: "CHARITY", email: "charity6@gmail.com", country: "Italy", type: "Non-profit" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown); // Toggle dropdown visibility
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role); // Set selected role for filtering
    setShowFilterDropdown(false); // Hide dropdown
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  const usersPerPage = 10;
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search the UserID, Username..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <button
            onClick={handleFilterClick}
            className="px-4 py-2 bg-pink-500 text-white rounded flex items-center gap-2"
          >
            <FilterListIcon /> Filters
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRoleSelect("")}
              >
                All
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRoleSelect("ADMIN")}
              >
                Admin
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRoleSelect("DORNOR")}
              >
                Dornor
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRoleSelect("CHARITY")}
              >
                Charity
              </div>
            </div>
          )}
        </div>
        <button className="px-4 py-2 bg-pink-500 text-white rounded">
          <AddIcon /> Add User
        </button>
      </div>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">NAME</th>
            <th className="border border-gray-300 p-2 text-left">ROLE</th>
            <th className="border border-gray-300 p-2 text-left">EMAIL</th>
            <th className="border border-gray-300 p-2 text-left">COUNTRY</th>
            <th className="border border-gray-300 p-2 text-left">TYPE</th>
            <th className="border border-gray-300 p-2 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.country}</td>
              <td className="border border-gray-300 p-2">{user.type}</td>
              <td className="border border-gray-300 p-2">
                <button className="text-red-500">
                  <DeleteOutlineIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            className={`px-2 py-1 border border-gray-300 rounded ${
              currentPage === page ? "bg-pink-500 text-white" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Users;

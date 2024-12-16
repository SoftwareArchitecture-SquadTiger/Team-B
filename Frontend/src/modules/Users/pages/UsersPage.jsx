import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SearchBar from "../components/SearchBar";
import FilterUser from "../components/FilterUser";
import AddUser from "../components/AddUser";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const [users, setUsers] = useState([
    { id: "ADM001", name: "Admin", role: "ADMIN", email: "admin@gmail.com", country: "Vietnam", type: "-" },
    { id: "DOR001", name: "Dornor 1", role: "DORNOR", email: "dornor1@gmail.com", country: "Germany", type: "-" },
    { id: "DOR002", name: "Dornor 3", role: "DORNOR", email: "dornor3@gmail.com", country: "USA", type: "-" },
    { id: "CHA001", name: "Charity 1", role: "CHARITY", email: "charity1@gmail.com", country: "South Africa", type: "Individual" },
    { id: "CHA002", name: "Charity 2", role: "CHARITY", email: "charity2@gmail.com", country: "Australia", type: "Non-profit" },
    { id: "ADM001", name: "Admin", role: "ADMIN", email: "admin@gmail.com", country: "Vietnam", type: "-" },
    { id: "DOR001", name: "Dornor 1", role: "DORNOR", email: "dornor1@gmail.com", country: "Germany", type: "-" },
    { id: "DOR002", name: "Dornor 3", role: "DORNOR", email: "dornor3@gmail.com", country: "USA", type: "-" },
    { id: "CHA001", name: "Charity 1", role: "CHARITY", email: "charity1@gmail.com", country: "South Africa", type: "Individual" },
    { id: "CHA002", name: "Charity 2", role: "CHARITY", email: "charity2@gmail.com", country: "Australia", type: "Non-profit" },
    { id: "ADM001", name: "Admin", role: "ADMIN", email: "admin@gmail.com", country: "Vietnam", type: "-" },
    { id: "DOR001", name: "Dornor 1", role: "DORNOR", email: "dornor1@gmail.com", country: "Germany", type: "-" },
    { id: "DOR002", name: "Dornor 3", role: "DORNOR", email: "dornor3@gmail.com", country: "USA", type: "-" },
    { id: "CHA001", name: "Charity 1", role: "CHARITY", email: "charity1@gmail.com", country: "South Africa", type: "Individual" },
    { id: "CHA002", name: "Charity 2", role: "CHARITY", email: "charity2@gmail.com", country: "Australia", type: "Non-profit" },
    { id: "ADM001", name: "Admin", role: "ADMIN", email: "admin@gmail.com", country: "Vietnam", type: "-" },
    { id: "DOR001", name: "Dornor 1", role: "DORNOR", email: "dornor1@gmail.com", country: "Germany", type: "-" },
    { id: "DOR002", name: "Dornor 3", role: "DORNOR", email: "dornor3@gmail.com", country: "USA", type: "-" },
    { id: "CHA001", name: "Charity 1", role: "CHARITY", email: "charity1@gmail.com", country: "South Africa", type: "Individual" },
    { id: "CHA002", name: "Charity 2", role: "CHARITY", email: "charity2@gmail.com", country: "Australia", type: "Non-profit" },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });
  
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user with ID: ${userId}?`);
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    }
  };
  
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
      </div>
      <div className="flex gap-4 mb-4">
        <SearchBar searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} />
        <FilterUser
          showDropdown={showFilterDropdown}
          onFilterClick={() => setShowFilterDropdown(!showFilterDropdown)}
          onSelectRole={(role) => {
            setSelectedRole(role);
            setShowFilterDropdown(false);
          }}
        />
        {/* Add User button now navigates to '/users/add' */}
        <AddUser onAdd={() => navigate("/users/add")} />
      </div>

      <UserTable users={paginatedUsers} onDelete={handleDelete} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersPage;

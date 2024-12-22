import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterUser from "../components/FilterUser";
import AddUser from "../components/AddUser";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import fetchUsers from "../services/fetchUsers";
import filterUsers from "../services/filterUsers";
import handleDeleteDonor from "../services/handleDeleteDonor";
import handleDeleteCharity from "../services/handleDeleteCharity"
import paginate from "../services/paginate";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const url = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;

  // Fetch donors and charities in one useEffect
  useEffect(() => {
    fetchUsers(url, setUsers);
  }, [url]);

  const filteredUsers = filterUsers(users, searchQuery, selectedRole);

  // Use the paginate utility
  const { paginatedItems, totalPages } = paginate(filteredUsers, currentPage, 10);

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
        <AddUser onAdd={() => navigate("/users/add")} />
      </div>

      <UserTable
        users={paginatedItems}
        onDelete={(userId) => (handleDeleteDonor(userId, users, setUsers, url),
          handleDeleteCharity(userId, users, setUsers, url))}

      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersPage;

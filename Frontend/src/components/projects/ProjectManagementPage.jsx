import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";

const ProjectManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter by status
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [projects, setProjects] = useState([
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", start: "1-Nov-2024", expired: "1-Nov-2024", status: "Pending" },
    { id: "PRO002", charity: "Charity 2", scale: "Global", goal: "$15000", start: "1-Oct-2024", expired: "1-Oct-2024", status: "Running" },
    { id: "PRO003", charity: "Charity 3", scale: "Local", goal: "$5000", start: "1-Dec-2024", expired: "1-Dec-2024", status: "Halted" },
    { id: "PRO004", charity: "Charity 4", scale: "Regional", goal: "$8000", start: "15-Nov-2024", expired: "15-Nov-2024", status: "Pending" },
    { id: "PRO005", charity: "Charity 5", scale: "Global", goal: "$20000", start: "1-Sep-2024", expired: "1-Sep-2024", status: "Running" },
    { id: "PRO006", charity: "Charity 6", scale: "Local", goal: "$4000", start: "1-Aug-2024", expired: "1-Aug-2024", status: "Pending" },
    { id: "PRO007", charity: "Charity 7", scale: "Regional", goal: "$7000", start: "10-Nov-2024", expired: "10-Nov-2024", status: "Halted" },
    { id: "PRO008", charity: "Charity 8", scale: "Global", goal: "$12000", start: "1-Jul-2024", expired: "1-Jul-2024", status: "Running" },
    { id: "PRO009", charity: "Charity 9", scale: "Local", goal: "$3000", start: "1-Jun-2024", expired: "1-Jun-2024", status: "Pending" },
    { id: "PRO010", charity: "Charity 10", scale: "Regional", goal: "$6000", start: "20-Nov-2024", expired: "20-Nov-2024", status: "Running" },
  ]);

  const projectsPerPage = 5;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setShowFilterDropdown(false);
  };

  const handleDelete = (id) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the project with ID: ${id}?`
    );

    if (confirmDelete) {
      // Remove project by ID
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    }
  };

  const handleAddProject = () => {
    navigate("/projects/add");
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus ? project.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Running":
        return "text-green-500";
      case "Halted":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search the Project ID..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <button
            onClick={handleFilterClick}
            className="px-4 py-2 bg-white text-pink-500 rounded flex items-center gap-2 border border-pink-500"
          >
            <FilterListIcon /> Filters
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div className="px-4 py-2 font-bold mt-2">Filter by Status</div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusSelect("")}
              >
                All
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusSelect("Pending")}
              >
                Pending
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusSelect("Running")}
              >
                Running
              </div>
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusSelect("Halted")}
              >
                Halted
              </div>
            </div>
          )}
        </div>
        <button onClick={handleAddProject} className="px-4 py-2 bg-pink-500 text-white rounded flex items-center">
          <AddIcon /> Add Project
        </button>
      </div>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">CHARITY</th>
            <th className="border border-gray-300 p-2 text-left">SCALE</th>
            <th className="border border-gray-300 p-2 text-left">GOAL</th>
            <th className="border border-gray-300 p-2 text-left">START</th>
            <th className="border border-gray-300 p-2 text-left">EXPIRED</th>
            <th className="border border-gray-300 p-2 text-left">STATUS</th>
            <th className="border border-gray-300 p-2 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map((project, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 p-2">{project.id}</td>
              <td className="border border-gray-300 p-2">{project.charity}</td>
              <td className="border border-gray-300 p-2">{project.scale}</td>
              <td className="border border-gray-300 p-2">{project.goal}</td>
              <td className="border border-gray-300 p-2">{project.start}</td>
              <td className="border border-gray-300 p-2">{project.expired}</td>
              <td
                className={`border border-gray-300 p-2 font-semibold ${getStatusClass(
                  project.status
                )}`}
              >
                {project.status}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500"
                >
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
          { length: Math.ceil(filteredProjects.length / projectsPerPage) },
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
          disabled={currentPage === Math.ceil(filteredProjects.length / projectsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProjectManagementPage;

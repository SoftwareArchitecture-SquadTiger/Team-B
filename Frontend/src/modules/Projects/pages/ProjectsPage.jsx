import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterProject from "../components/FilterProject";
import AddProject from "../components/AddProject";
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const ProjectManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [projects, setProjects] = useState([
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", start: "1-Nov-2024", expired: "1-Nov-2024", status: "Pending" },
    { id: "PRO002", charity: "Charity 2", scale: "Global", goal: "$15000", start: "1-Oct-2024", expired: "1-Oct-2024", status: "Running" },
    { id: "PRO003", charity: "Charity 3", scale: "Local", goal: "$5000", start: "1-Dec-2024", expired: "1-Dec-2024", status: "Halted" },
    { id: "PRO004", charity: "Charity 4", scale: "Regional", goal: "$8000", start: "15-Nov-2024", expired: "15-Nov-2024", status: "Pending" },
    { id: "PRO005", charity: "Charity 5", scale: "Global", goal: "$20000", start: "1-Sep-2024", expired: "1-Sep-2024", status: "Completed" },
    { id: "PRO006", charity: "Charity 6", scale: "Local", goal: "$4000", start: "1-Aug-2024", expired: "1-Aug-2024", status: "Pending" },
    { id: "PRO007", charity: "Charity 7", scale: "Regional", goal: "$7000", start: "10-Nov-2024", expired: "10-Nov-2024", status: "Halted" },
    { id: "PRO008", charity: "Charity 8", scale: "Global", goal: "$12000", start: "1-Jul-2024", expired: "1-Jul-2024", status: "Running" },
    { id: "PRO009", charity: "Charity 9", scale: "Local", goal: "$3000", start: "1-Jun-2024", expired: "1-Jun-2024", status: "Completed" },
    { id: "PRO010", charity: "Charity 10", scale: "Regional", goal: "$6000", start: "20-Nov-2024", expired: "20-Nov-2024", status: "Running" },
    { id: "PRO006", charity: "Charity 6", scale: "Local", goal: "$4000", start: "1-Aug-2024", expired: "1-Aug-2024", status: "Pending" },
    { id: "PRO007", charity: "Charity 7", scale: "Regional", goal: "$7000", start: "10-Nov-2024", expired: "10-Nov-2024", status: "Halted" },
    { id: "PRO008", charity: "Charity 8", scale: "Global", goal: "$12000", start: "1-Jul-2024", expired: "1-Jul-2024", status: "Running" },
    { id: "PRO009", charity: "Charity 9", scale: "Local", goal: "$3000", start: "1-Jun-2024", expired: "1-Jun-2024", status: "Pending" },
    { id: "PRO010", charity: "Charity 10", scale: "Regional", goal: "$6000", start: "20-Nov-2024", expired: "20-Nov-2024", status: "Running" },
  ]);

  const projectsPerPage = 5;
  const navigate = useNavigate();

  // Filter projects based on search query and selected status
  const filteredProjects = projects.filter(
    (project) =>
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedStatus || project.status === selectedStatus)
  );

  // Handle delete project
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete the project with ID: ${id}?`)) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  // Handle changing project status
  const handleStatusChange = (id, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project
      )
    );
  };

  // Paginate the projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-4">
        <SearchBar searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} />
        <FilterProject
          showDropdown={showFilterDropdown}
          onFilterClick={() => setShowFilterDropdown(!showFilterDropdown)}
          onSelectStatus={setSelectedStatus}
        />
        <AddProject onAdd={() => navigate("/add-project")} />
      </div>

      {/* Project Table */}
      <ProjectTable
        projects={paginatedProjects}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange} // Pass status change handler
      />

      {/* Pagination */}
      <Pagination
        totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProjectManagementPage;



/* { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", start: "1-Nov-2024", expired: "1-Nov-2024", status: "Pending" },
    { id: "PRO002", charity: "Charity 2", scale: "Global", goal: "$15000", start: "1-Oct-2024", expired: "1-Oct-2024", status: "Running" },
    { id: "PRO003", charity: "Charity 3", scale: "Local", goal: "$5000", start: "1-Dec-2024", expired: "1-Dec-2024", status: "Halted" },
    { id: "PRO004", charity: "Charity 4", scale: "Regional", goal: "$8000", start: "15-Nov-2024", expired: "15-Nov-2024", status: "Pending" },
    { id: "PRO005", charity: "Charity 5", scale: "Global", goal: "$20000", start: "1-Sep-2024", expired: "1-Sep-2024", status: "Running" },
    { id: "PRO006", charity: "Charity 6", scale: "Local", goal: "$4000", start: "1-Aug-2024", expired: "1-Aug-2024", status: "Pending" },
    { id: "PRO007", charity: "Charity 7", scale: "Regional", goal: "$7000", start: "10-Nov-2024", expired: "10-Nov-2024", status: "Halted" },
    { id: "PRO008", charity: "Charity 8", scale: "Global", goal: "$12000", start: "1-Jul-2024", expired: "1-Jul-2024", status: "Running" },
    { id: "PRO009", charity: "Charity 9", scale: "Local", goal: "$3000", start: "1-Jun-2024", expired: "1-Jun-2024", status: "Pending" },
    { id: "PRO010", charity: "Charity 10", scale: "Regional", goal: "$6000", start: "20-Nov-2024", expired: "20-Nov-2024", status: "Running" },
    { id: "PRO006", charity: "Charity 6", scale: "Local", goal: "$4000", start: "1-Aug-2024", expired: "1-Aug-2024", status: "Pending" },
    { id: "PRO007", charity: "Charity 7", scale: "Regional", goal: "$7000", start: "10-Nov-2024", expired: "10-Nov-2024", status: "Halted" },
    { id: "PRO008", charity: "Charity 8", scale: "Global", goal: "$12000", start: "1-Jul-2024", expired: "1-Jul-2024", status: "Running" },
    { id: "PRO009", charity: "Charity 9", scale: "Local", goal: "$3000", start: "1-Jun-2024", expired: "1-Jun-2024", status: "Pending" },
    { id: "PRO010", charity: "Charity 10", scale: "Regional", goal: "$6000", start: "20-Nov-2024", expired: "20-Nov-2024", status: "Running" },*/
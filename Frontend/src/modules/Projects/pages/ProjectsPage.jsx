import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterProject from "../components/FilterProject";
import AddProject from "../components/AddProject";
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import fetchProjects from "../services/fetchProjects";
import handleDeleteProject from "../services/handleDeleteProject";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const projectsPerPage = 10;
  const url = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects(url, setProjects);
  }, [url]);

  // Filter projects based on search query and status
  const filteredProjects = projects.filter(
    (project) =>
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedStatus || project.status === selectedStatus)
  );

  // Paginate the projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Handle project status change
  const handleStatusChange = (id, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
      </div>
      <div className="flex gap-4 mb-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearch={(e) => setSearchQuery(e.target.value)}
        />
        <FilterProject
          showDropdown={showFilterDropdown}
          onFilterClick={() => setShowFilterDropdown(!showFilterDropdown)}
          onSelectStatus={setSelectedStatus}
        />
        <AddProject onAdd={() => alert("Redirect to add project page")} />
      </div>
      <ProjectTable
        projects={paginatedProjects}
        onDelete={(id) =>
          handleDeleteProject(id, projects, setProjects, url)
        }
        onStatusChange={handleStatusChange}
      />
      <Pagination
        totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProjectsPage;

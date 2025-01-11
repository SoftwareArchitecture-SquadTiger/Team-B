import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterProject from "../components/FilterProject";
import AddProject from "../components/AddProject";
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import HaltProjectForm from "../components/HaltProjectForm"; // Import HaltProjectForm
import { fetchProjectsAPI } from "../hooks/callProjectsAPI";
import { handleDeleteProject } from "../services/handleDeleteProject";
import { fetchProjectByTitle } from "../services/fetchProjects";
import { updateProjectStatusAPI } from "../services/updateProjectStatus";
import { fetchProjectByRegion } from "../services/fetchProjectbyRegion";
import { fetchProjectsByStatus } from "../services/fetchProjectsByStatus";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); // All projects data
  const [filteredProjects, setFilteredProjects] = useState([]); // Filtered or searched data
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [filter, setFilter] = useState({ region: "", status: "" });
  const [selectedProject, setSelectedProject] = useState(null); // Selected project for halting
  const [showHaltModal, setShowHaltModal] = useState(false); // To toggle modal visibility
  const navigate = useNavigate();

  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchProjectsAPI();
        const transformedProjects = response.projectResponse.map((project) => ({
          id: project.project_id,
          title: project.title || "N/A",
          charity: project.charity_id || "Unknown Charity",
          scale: project.region || "Unknown Region",
          goal: project.target_amount || 0,
          start: new Date(project.start_date).toLocaleDateString(),
          expired: new Date(project.end_date).toLocaleDateString(),
          status: project.status || "Pending",
        }));
        setProjects(transformedProjects);
        setFilteredProjects(transformedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query); // Update the query in the search bar

    if (!query.trim()) {
      // Reset to all projects when search is cleared
      setFilteredProjects(projects);
    } else {
      try {
        const result = await fetchProjectByTitle(query.trim());
        if (result.projectResponse && result.projectResponse.length > 0) {
          const transformedProject = result.projectResponse.map((project) => ({
            id: project.project_id,
            title: project.title || "N/A",
            charity: project.charity_id || "Unknown Charity",
            scale: project.region || "Unknown Region",
            goal: project.target_amount || 0,
            start: new Date(project.start_date).toLocaleDateString(),
            expired: new Date(project.end_date).toLocaleDateString(),
            status: project.status || "Pending",
          }));
          setFilteredProjects(transformedProject);
        } else {
          setFilteredProjects([]); // No matching projects found
        }
      } catch (error) {
        console.error("Error searching project by ID:", error);
      }
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const isDeleted = await handleDeleteProject(id);
        if (isDeleted) {
          // Update frontend state after successful deletion
          setProjects((prev) => prev.filter((project) => project.id !== id));
          setFilteredProjects((prev) =>
            prev.filter((project) => project.id !== id)
          );
          alert(`Project with ID: ${id} deleted successfully.`);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete the project. Please try again.");
      }
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id, status) => {
    if (status === "Halted") {
      const confirm = window.confirm("Are you sure you want to halt this project?");
      if (confirm) {
        const projectToHalt = projects.find((project) => project.id === id);
        setSelectedProject(projectToHalt);
        setShowHaltModal(true);
      }
      return; // Stop further execution
    }

    try {
      await updateProjectStatusAPI(id, status);
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id ? { ...project, status } : project
        )
      );
      setFilteredProjects((prev) =>
        prev.map((project) =>
          project.id === id ? { ...project, status } : project
        )
      );
      alert(`Project status updated to '${status}' successfully.`);
    } catch (error) {
      console.error("Error updating project status:", error);
      alert("Failed to update the project status. Please try again.");
    }
  };

  // Apply filters when filter state changes
  const handleRegionFilter = async (region) => {
    if (region === "All Regions") {
      setFilteredProjects(projects); // Reset to all projects
      return;
    }

    try {
      const result = await fetchProjectByRegion(region);
      if (result.projectResponse && result.projectResponse.length > 0) {
        const transformedProjects = result.projectResponse.map((project) => ({
          id: project.project_id,
          title: project.title || "N/A",
          charity: project.charity_id || "Unknown Charity",
          scale: project.region || "Unknown Region",
          goal: project.target_amount || 0,
          start: new Date(project.start_date).toLocaleDateString(),
          expired: new Date(project.end_date).toLocaleDateString(),
          status: project.status || "Pending",
        }));
        setFilteredProjects(transformedProjects);
      } else {
        setFilteredProjects([]);
      }
    } catch (error) {
      console.error("Error filtering projects by region:", error);
    }
  };

  const handleStatusFilter = async (status) => {
    if (status === "All Status") {
      setFilteredProjects(projects); // Reset to all projects
      return;
    }

    try {
      const result = await fetchProjectsByStatus(status);
      if (result.projectResponse && result.projectResponse.length > 0) {
        const transformedProjects = result.projectResponse.map((project) => ({
          id: project.project_id,
          title: project.title || "N/A",
          charity: project.charity_id || "Unknown Charity",
          scale: project.region || "Unknown Region",
          goal: project.target_amount || 0,
          start: new Date(project.start_date).toLocaleDateString(),
          expired: new Date(project.end_date).toLocaleDateString(),
          status: project.status || "Pending",
        }));
        setFilteredProjects(transformedProjects);
      } else {
        setFilteredProjects([]);
      }
    } catch (error) {
      console.error("Error filtering projects by status:", error);
    }
  };

  // Paginated projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearch={(e) => handleSearch(e.target.value)}
        />
        <FilterProject
          onFilter={setFilter}
          onRegionChange={handleRegionFilter}
          onStatusChange={handleStatusFilter}
        />
        <button
          onClick={() => navigate("/add-project")}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          + Add Project
        </button>
      </div>

      <ProjectTable
        projects={paginatedProjects}
        onDelete={handleDelete}
        onUpdateStatus={handleUpdateStatus} // Pass update status handler
      />

      <Pagination
        totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {showHaltModal && selectedProject && (
        <HaltProjectForm
        projectId={selectedProject.id}
        projectTitle={selectedProject.title}
        charityId={selectedProject.charity}
        onClose={() => setSelectedProject(null)}
        onUpdate={(id, status) => {
          setProjects((prev) =>
            prev.map((project) =>
              project.id === id ? { ...project, status } : project
            )
          );
          setFilteredProjects((prev) =>
            prev.map((project) =>
              project.id === id ? { ...project, status } : project
            )
          );
        }}
      />
      
      
      )}
    </div>
  );
};

export default ProjectsPage;

import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterProject from "../components/FilterProject";
import AddProject from "../components/AddProject";
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import { fetchProjectsAPI, deleteProjectAPI, updateProjectStatusAPI } from "../hooks/callProjectsAPI";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); // Ensure state defaults to an array
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchProjectsAPI();
        const transformedProjects = response.projectResponse.map((project) => ({
          id: project._id, // Map _id to id
          charity: project.charity_id || "Unknown Charity", // Adjust this based on actual data
          scale: project.region || "Unknown Region", // Adjust to match your data structure
          goal: project.target_amount || 0,
          start: new Date(project.start_date).toLocaleDateString(),
          expired: new Date(project.end_date).toLocaleDateString(),
          status: project.status || "Pending",
        }));
        setProjects(transformedProjects); // Set transformed data to state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjects();
  }, []);
  


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProjectAPI(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await updateProjectStatusAPI(id, status);
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, status } : project))
    );
  };

  const filteredProjects = projects.filter((project) =>
  Object.values(project).some((value) =>
    value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  )
);



  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  console.log("Paginated projects:", paginatedProjects); // Debugging
  

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <SearchBar searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} />
        <FilterProject />
        <AddProject />
      </div>

      <ProjectTable
        projects={paginatedProjects}
        onDelete={handleDelete}
        onUpdateStatus={handleUpdateStatus}
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

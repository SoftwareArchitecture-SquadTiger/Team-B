// services/handleDeleteProject.js
import { deleteProjectById } from "../hooks/callProjectsAPI";

const handleDeleteProject = async (projectId, projects, setProjects, url) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the project with ID: ${projectId}?`
  );

  if (confirmDelete) {
    try {
      await deleteProjectById(url, projectId);

      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      setProjects(updatedProjects);

      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project. Please try again.");
    }
  }
};

export default handleDeleteProject;

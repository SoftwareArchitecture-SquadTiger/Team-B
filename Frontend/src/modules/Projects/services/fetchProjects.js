// services/fetchProjects.js
import { callProjectsAPI } from "../hooks/callProjectsAPI";

export const fetchProjects = async (url, setProjects) => {
  try {
    const projectsData = await callProjectsAPI(url);

    const formattedProjects = projectsData.map((project) => ({
      id: project.project_id,
      charity: project.charity_id, // Replace with the actual charity name if needed
      scale: project.region,
      goal: `$${project.target_amount}`,
      start: new Date(project.start_date).toLocaleDateString(),
      expired: new Date(project.end_date).toLocaleDateString(),
      status: project.status.charAt(0).toUpperCase() + project.status.slice(1), 
    }));

    setProjects(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
  }
};

export default fetchProjects;

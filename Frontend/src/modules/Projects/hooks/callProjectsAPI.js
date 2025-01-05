// hooks/callProjectsAPI.js
export const callProjectsAPI = async (url) => {
    try {
      const response = await fetch(`${url}/client-server/projects`);
      if (!response.ok) throw new Error("Failed to fetch projects");
  
      const projectsData = await response.json();
      return projectsData.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };
  
  export const deleteProjectById = async (url, projectId) => {
    const response = await fetch(`${url}/client-server/projects/delete/${projectId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete the project");
    }
  
    return true;
  };
  
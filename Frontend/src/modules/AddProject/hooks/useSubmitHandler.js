import { createProjectAPI } from "../services/createProject";

export const handleSubmit = async (e, projectData, setLoading, navigate) => {
  e.preventDefault();
  setLoading(true);

  const formattedProjectData = {
    ...projectData,
    target_amount: Number(projectData.target_amount),
  };

  try {
    const response = await createProjectAPI(formattedProjectData);
    alert("Project created successfully!");
    navigate("/projects");
  } catch (error) {
    console.error("Error creating project:", error.message);
    alert(error.message || "Failed to create the project. Please try again.");
  } finally {
    setLoading(false);
  }
};

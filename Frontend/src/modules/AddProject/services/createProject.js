import axios from "axios";

const createProjectAPI = async (projectData) => {
  try {
    const apiUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/client-server/project/create`;

    // Ensure data matches backend model
    const payload = {
        project_id: projectData.project_id,
        category_id: projectData.category_id,
        charity_id: projectData.charity_id,
        title: projectData.title,
        target_amount: Number(projectData.target_amount), // Convert to number
        description: projectData.description || "",
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        region: projectData.region,
        country: projectData.country,
        images: projectData.images || [],
        videos: projectData.videos || [],
        status: projectData.status || "Pending",
      };

    const response = await axios.post(apiUrl, formattedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
        console.log("Submitting project data:", payload); // Debugging
        await createProjectAPI(payload);
        alert("Project created successfully!");
        navigate("/projects");
      } catch (error) {
        console.error("Error creating project:", error.message);
        alert(error.message || "Failed to create the project. Please try again.");
      } finally {
        setLoading(false);
      }


    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response || error.message);
    throw new Error(
      error.response?.data?.error || "Failed to create the project."
    );
  }
};

export { createProjectAPI };

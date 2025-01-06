import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // For generating random IDs
import ProjectTitleInput from "../components/ProjectTitleInput";
import ProjectDescription from "../components/ProjectDescription";
import FileUpload from "../components/FileUpload";
import FormButtons from "../components/FormButtons";
import { createProjectAPI } from "../services/createProject";

const AddProjectForm = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    project_id: uuidv4(),
    category_id: uuidv4(),
    charity_id: uuidv4(),
    title: "",
    target_amount: "",
    description: "",
    start_date: "",
    end_date: "",
    region: "",
    country: "",
    images: [],
    videos: [],
    status: "Pending", // Default status
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);
    setProjectData({ ...projectData, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting project data:", projectData); // Debugging
      await createProjectAPI(projectData);
      alert("Project created successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error.message);
      alert(error.message || "Failed to create the project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    navigate("/projects");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <ProjectTitleInput
          name="title"
          value={projectData.title}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label htmlFor="target_amount" className="block mb-1 text-gray-600">
            Target Amount
          </label>
          <input
            type="text"
            name="target_amount"
            id="target_amount"
            value={projectData.target_amount}
            onChange={handleNumberChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <input
          type="date"
          name="start_date"
          value={projectData.start_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="date"
          name="end_date"
          value={projectData.end_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <div className="mb-4">
          <label htmlFor="region" className="block mb-1 text-gray-600">
            Region
          </label>
          <select
            name="region"
            id="region"
            value={projectData.region}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Region
            </option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Southeast Asia">Southeast Asia</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1 text-gray-600">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={projectData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <ProjectDescription
          name="description"
          value={projectData.description}
          onChange={handleChange}
        />
        <FileUpload name="images" onChange={handleFileChange} multiple />
        <FileUpload name="videos" onChange={handleFileChange} multiple />
        <FormButtons onReturn={handleReturn} isLoading={loading} />
      </form>
    </div>
  );
};

export default AddProjectForm;

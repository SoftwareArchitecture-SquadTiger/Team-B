import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectTitleInput from "../components/ProjectTitleInput";
import ProjectCategoryInput from "../components/ProjectCategoryInput";
import CountrySelector from "../components/CountrySelector";
import FundingGoalInput from "../components/FundingGoalInput";
import ProjectDescription from "../components/ProjectDescription";
import FileUpload from "../components/FileUpload";
import FormButtons from "../components/FormButtons";

const AddProjectForm = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    category: "",
    country: "Global",
    goal: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProjectData({ ...projectData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Project:", projectData);
    alert("Project Created Successfully!");
    navigate("/projects");
  };

  const handleReturn = () => {
    navigate("/projects");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Project Account Form</h2>
      <form onSubmit={handleSubmit}>
        <ProjectTitleInput value={projectData.title} onChange={handleChange} />
        <ProjectCategoryInput value={projectData.category} onChange={handleChange} />
        <CountrySelector value={projectData.country} onChange={handleChange} />
        <FundingGoalInput value={projectData.goal} onChange={handleChange} />
        <ProjectDescription value={projectData.description} onChange={handleChange} />
        <FileUpload onChange={handleFileChange} />
        <FormButtons onReturn={handleReturn} />
      </form>
    </div>
  );
};

export default AddProjectForm;

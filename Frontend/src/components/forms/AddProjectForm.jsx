import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProjectForm = () => {
  const navigate = useNavigate(); // Hook for navigation
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
    // Add logic to save project (e.g., send data to server)
    alert("Project Created Successfully!");
    navigate("/projects"); // Navigate back after successful creation
  };

  const handleReturn = () => {
    navigate("/projects"); // Navigate back to Project Management Page
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Project Account Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={projectData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter project category"
            required
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <select
            name="country"
            value={projectData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Global">Global</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Funding Goal */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Funding Goal</label>
          <input
            type="number"
            name="goal"
            value={projectData.goal}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter funding goal (e.g., $5000)"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Enter project description"
          ></textarea>
        </div>

        {/* Project Image/Video */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Project Image/Video</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, audio/mp3"
            className="w-full p-2 border rounded"
          />
          <p className="text-gray-500 text-sm mt-1">
            Upload a file or drag and drop PNG, JPG, MP3 up to 200MB.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleReturn}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Return
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;

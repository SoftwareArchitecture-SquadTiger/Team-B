import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectTitleInput from "../components/ProjectTitleInput";
import ProjectDescription from "../components/ProjectDescription";
import FileUpload from "../components/FileUpload";
import FormButtons from "../components/FormButtons";
import { useCharities } from "../hooks/useCharities";
import { useRegionCountries } from "../hooks/useRegionCountries";
import {
  handleChange,
  handleFileChange,
  handleNumberChange,
} from "../hooks/useFormHandlers";
import { handleSubmit } from "../hooks/useSubmitHandler";

const AddProjectForm = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    category_id: "",
    charity_id: "",
    title: "",
    target_amount: "",
    description: "",
    start_date: "",
    end_date: "",
    region: "",
    country: "",
    images: [],
    videos: [],
  });

  const [loading, setLoading] = useState(false);
  const { filteredCountries, updateFilteredCountries, regionsWithCountries } =
    useRegionCountries();
  const charities = useCharities();

  const handleRegionChange = (e) => {
    const { value } = e.target;
    updateFilteredCountries(value);
    setProjectData({ ...projectData, region: value, country: "" });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h2>
      <form
        onSubmit={(e) =>
          handleSubmit(e, projectData, setLoading, navigate)
        }
      >
        <ProjectTitleInput
          name="title"
          value={projectData.title}
          onChange={(e) => handleChange(e, projectData, setProjectData)}
          required
        />
        <div className="mb-4">
          <label htmlFor="category_id" className="block mb-1 text-gray-600">
            Category ID
          </label>
          <input
            type="text"
            name="category_id"
            value={projectData.category_id}
            onChange={(e) => handleChange(e, projectData, setProjectData)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Category ID"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="target_amount" className="block mb-1 text-gray-600">
            Target Amount
          </label>
          <input
            type="text"
            name="target_amount"
            value={projectData.target_amount}
            onChange={(e) => handleNumberChange(e, projectData, setProjectData)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <input
          type="date"
          name="start_date"
          value={projectData.start_date}
          onChange={(e) => handleChange(e, projectData, setProjectData)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="date"
          name="end_date"
          value={projectData.end_date}
          onChange={(e) => handleChange(e, projectData, setProjectData)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <div className="mb-4">
          <label htmlFor="region" className="block mb-1 text-gray-600">
            Region
          </label>
          <select
            name="region"
            value={projectData.region}
            onChange={handleRegionChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Region
            </option>
            {Object.keys(regionsWithCountries).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1 text-gray-600">
            Country
          </label>
          <select
            name="country"
            value={projectData.country}
            onChange={(e) => handleChange(e, projectData, setProjectData)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={!projectData.region}
          >
            <option value="" disabled>
              Select Country
            </option>
            {filteredCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="charity_id" className="block mb-1 text-gray-600">
            Charity
          </label>
          <select
            name="charity_id"
            value={projectData.charity_id}
            onChange={(e) => handleChange(e, projectData, setProjectData)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Charity
            </option>
            {charities.map((charity) => (
              <option key={charity.charity_id} value={charity.charity_id}>
                {charity.name}
              </option>
            ))}
          </select>
        </div>
        <ProjectDescription
          name="description"
          value={projectData.description}
          onChange={(e) => handleChange(e, projectData, setProjectData)}
        />
        <FileUpload
          name="images"
          onChange={(e) => handleFileChange(e, projectData, setProjectData)}
          multiple
        />
        <FileUpload
          name="videos"
          onChange={(e) => handleFileChange(e, projectData, setProjectData)}
          multiple
        />
        <FormButtons
          onReturn={() => navigate("/projects")}
          isLoading={loading}
        />
      </form>
    </div>
  );
};

export default AddProjectForm;

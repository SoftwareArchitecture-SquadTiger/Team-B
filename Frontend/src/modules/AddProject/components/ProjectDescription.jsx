import React from "react";

const ProjectDescription = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Description</label>
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        rows="4"
        placeholder="Enter project description"
      ></textarea>
    </div>
  );
};

export default ProjectDescription;

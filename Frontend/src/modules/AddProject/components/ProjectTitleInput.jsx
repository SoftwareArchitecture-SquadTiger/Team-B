import React from "react";

const ProjectTitleInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Project Title</label>
      <input
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder="Enter project title"
        required
      />
    </div>
  );
};

export default ProjectTitleInput;

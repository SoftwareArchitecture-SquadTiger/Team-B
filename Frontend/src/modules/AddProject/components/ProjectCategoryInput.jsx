import React from "react";

const ProjectCategoryInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Category</label>
      <input
        type="text"
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder="Enter project category"
        required
      />
    </div>
  );
};

export default ProjectCategoryInput;

import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddProject = ({ onAdd }) => (
  <button
    onClick={onAdd}
    className="px-4 py-2 bg-pink-500 text-white rounded flex items-center"
  >
    <AddIcon /> Add Project
  </button>
);

export default AddProject;

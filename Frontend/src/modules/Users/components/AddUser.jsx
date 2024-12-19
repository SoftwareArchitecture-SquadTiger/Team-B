import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddUser = ({ onAdd }) => (
  <button onClick={onAdd} className="px-4 py-2 bg-pink-500 text-white rounded">
    <AddIcon /> Add User
  </button>
);

export default AddUser;

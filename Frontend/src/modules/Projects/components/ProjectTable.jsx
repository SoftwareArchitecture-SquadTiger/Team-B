import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ProjectTable = ({ projects, onDelete, onStatusChange }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Running":
        return "text-green-500";
      case "Halted":
        return "text-red-500";
      case "Completed":
        return "text-blue-800"; 
      default:
        return "text-gray-500";
    }
  };

  return (
    <table className="w-full border-collapse mb-4">
      <thead>
        <tr className="bg-gray-200">
          {["ID", "CHARITY", "SCALE", "GOAL", "START", "EXPIRED", "STATUS", "ACTION"].map(
            (heading) => (
              <th key={heading} className="border border-gray-300 p-2 text-left">
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 p-2">{project.id}</td>
            <td className="border border-gray-300 p-2">{project.charity}</td>
            <td className="border border-gray-300 p-2">{project.scale}</td>
            <td className="border border-gray-300 p-2">{project.goal}</td>
            <td className="border border-gray-300 p-2">{project.start}</td>
            <td className="border border-gray-300 p-2">{project.expired}</td>
            <td className={`border border-gray-300 p-2 font-semibold ${getStatusClass(project.status)}`}>
              {/* Status Dropdown */}
              <select
                value={project.status}
                onChange={(e) => onStatusChange(project.id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="Pending">Pending</option>
                <option value="Running">Running</option>
                <option value="Halted">Halted</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td className="border border-gray-300 p-2">
              {/* Trash Icon for Delete */}
              <button
                onClick={() => onDelete(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <DeleteOutlineIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;

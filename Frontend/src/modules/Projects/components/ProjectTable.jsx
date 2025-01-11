import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ProjectTable = ({ projects, onDelete, onUpdateStatus }) => {
  const statusOptions = ["Pending", "Running", "Halted", "Completed"];

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
          {["TITLE", "PROJECT_ID", "SCALE", "GOAL", "START", "EXPIRED", "STATUS", "ACTION"].map(
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
            <td className="border border-gray-300 p-2">{project.title || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.id || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.scale || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.goal || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.start || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.expired || "N/A"}</td>
            <td className={`border border-gray-300 p-2 ${getStatusClass(project.status)}`}>
              <select
                value={project.status}
                onChange={(e) => onUpdateStatus(project.id, e.target.value)}
                className="border border-gray-300 rounded p-1"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => {
                  console.log("Deleting project with ID:", project.id); // Debugging project ID
                  onDelete(project.id);
                }}
                className="text-red-500"
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

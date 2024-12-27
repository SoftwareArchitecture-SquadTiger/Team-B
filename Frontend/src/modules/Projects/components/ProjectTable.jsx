import React from "react";

const ProjectTable = ({ projects, onDelete, onUpdateStatus }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Running":
        return "text-green-500";
      case "Completed":
        return "text-navy-500";
      case "Halted":
        return "text-red-500";
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
           <td className="border border-gray-300 p-2">{project.id || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.charity || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.scale || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.goal || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.start || "N/A"}</td>
            <td className="border border-gray-300 p-2">{project.expired || "N/A"}</td>
            <td className={`border border-gray-300 p-2 ${getStatusClass(project.status)}`}>
              <select
                value={project.status}
                onChange={(e) => onUpdateStatus(project.id, e.target.value)}
                className="bg-transparent border-none outline-none text-sm cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
                <option value="Halted">Halted</option>
              </select>
            </td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => onDelete(project.id)} className="text-red-500">
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;

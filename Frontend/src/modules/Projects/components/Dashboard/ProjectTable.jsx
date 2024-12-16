import React from "react";

const ProjectTable = () => {
  const projects = [
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", now: "$10000" },
    { id: "PRO002", charity: "Charity ", scale: "Regional", goal: "$10000", now: "$10000" },
    { id: "PRO003", charity: "Charity 1", scale: "Regional", goal: "$10000", now: "$10000" },
    { id: "PRO004", charity: "Charity 1", scale: "Global", goal: "$10000", now: "$10000" },
    { id: "PRO005", charity: "Charity 1", scale: "Global", goal: "$10000", now: "$10000" },
  ];

  return (
    <div className="p-4 border-2 border-blue-500 rounded-md">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left font-bold">ID</th>
            <th className="p-2 text-left font-bold">CHARITY</th>
            <th className="p-2 text-left font-bold">SCALE</th>
            <th className="p-2 text-left font-bold">GOAL</th>
            <th className="p-2 text-left font-bold">NOW</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-t border-gray-300">
              
              <td className="p-2">{project.id}</td>
              <td className="p-2">{project.charity}</td>
              <td className="p-2">{project.scale}</td>
              <td className="p-2">{project.goal}</td>
              <td className="p-2">{project.now}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

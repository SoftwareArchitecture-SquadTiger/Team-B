import React, { useState } from "react";

const ProjectTable = () => {
  const [projects, setProjects] = useState([
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", currentAmount: "$10000" },
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", currentAmount: "$10000" },
    { id: "PRO001", charity: "Charity 1", scale: "Regional", goal: "$10000", currentAmount: "$10000" },
    { id: "PRO001", charity: "Charity 1", scale: "Global", goal: "$10000", currentAmount: "$10000" },
    { id: "PRO001", charity: "Charity 1", scale: "Global", goal: "$10000", currentAmount: "$10000" },
  ]);

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2 text-left font-bold uppercase text-sm">ID</th>
            <th className="p-2 text-left font-bold uppercase text-sm">CHARITY</th>
            <th className="p-2 text-left font-bold uppercase text-sm">SCALE</th>
            <th className="p-2 text-left font-bold uppercase text-sm">GOAL</th>
            <th className="p-2 text-left font-bold uppercase text-sm">NOW</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="bg-white border-b border-gray-300">
              <td className="p-2 text-left">{project.id}</td>
              <td className="p-2 text-left">{project.charity}</td>
              <td className="p-2 text-left">{project.scale}</td>
              <td className="p-2 text-left">{project.goal}</td>
              <td className="p-2 text-left">{project.currentAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

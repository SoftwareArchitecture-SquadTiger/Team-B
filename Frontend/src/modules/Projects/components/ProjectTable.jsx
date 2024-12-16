// import React from "react";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const ProjectTable = ({ projects, onDelete }) => {
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Pending":
//         return "text-yellow-500";
//       case "Running":
//         return "text-green-500";
//       case "Halted":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   return (
//     <table className="w-full border-collapse mb-4">
//       <thead>
//         <tr className="bg-gray-200">
//           {["ID", "CHARITY", "SCALE", "GOAL", "START", "EXPIRED", "STATUS", "ACTION"].map(
//             (heading) => (
//               <th key={heading} className="border border-gray-300 p-2 text-left">
//                 {heading}
//               </th>
//             )
//           )}
//         </tr>
//       </thead>
//       <tbody>
//         {projects.map((project, index) => (
//           <tr key={index} className="odd:bg-white even:bg-gray-50">
//             <td className="border border-gray-300 p-2">{project.id}</td>
//             <td className="border border-gray-300 p-2">{project.charity}</td>
//             <td className="border border-gray-300 p-2">{project.scale}</td>
//             <td className="border border-gray-300 p-2">{project.goal}</td>
//             <td className="border border-gray-300 p-2">{project.start}</td>
//             <td className="border border-gray-300 p-2">{project.expired}</td>
//             <td className={`border border-gray-300 p-2 font-semibold ${getStatusClass(project.status)}`}>
//               {project.status}
//             </td>
//             <td className="border border-gray-300 p-2">
//               <button onClick={() => onDelete(project.id)} className="text-red-500">
//                 <DeleteOutlineIcon />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProjectTable;

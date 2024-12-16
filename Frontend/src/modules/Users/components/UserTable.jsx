import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UserTable = ({ users }) => (
  <table className="w-full border-collapse mb-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 p-2 text-left">ID</th>
        <th className="border border-gray-300 p-2 text-left">NAME</th>
        <th className="border border-gray-300 p-2 text-left">ROLE</th>
        <th className="border border-gray-300 p-2 text-left">EMAIL</th>
        <th className="border border-gray-300 p-2 text-left">COUNTRY</th>
        <th className="border border-gray-300 p-2 text-left">TYPE</th>
        <th className="border border-gray-300 p-2 text-left">ACTION</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index} className="odd:bg-white even:bg-gray-50">
          <td className="border border-gray-300 p-2">{user.id}</td>
          <td className="border border-gray-300 p-2">{user.name}</td>
          <td className="border border-gray-300 p-2">{user.role}</td>
          <td className="border border-gray-300 p-2">{user.email}</td>
          <td className="border border-gray-300 p-2">{user.country}</td>
          <td className="border border-gray-300 p-2">{user.type}</td>
          <td className="border border-gray-300 p-2">
            <button className="text-red-500">
              <DeleteOutlineIcon />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;

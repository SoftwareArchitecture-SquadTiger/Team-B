import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { handleLogout } from "../modules/Logout/service/handleLogout";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-1/5 min-h-screen fixed top-0 left-0 bg-gray-100 p-4 overflow-y-auto shadow-md">
      {/* Logo Section */}
      <Link to="/dashboard">
        <h1 className="text-black text-2xl font-bold mb-14 flex items-center cursor-pointer">
          <FavoriteBorderIcon className="mr-2 text-pink-500" /> Charitan
        </h1>
      </Link>

      {/* Menu Items */}
      <ul className="space-y-12">
        <li
          className={`text-xl font-bold ${
            isActive("/dashboard") ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
          }`}
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`text-xl font-bold ${
            isActive("/statistics") ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
          }`}
        >
          <Link to="/statistics">Statistics</Link>
        </li>
        <li
          className={`text-xl font-bold ${
            isActive("/users") ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
          }`}
        >
          <Link to="/users">Users</Link>
        </li>
        <li
          className={`text-xl font-bold ${
            isActive("/projects") ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
          }`}
        >
          <Link to="/projects">Projects</Link>
        </li>
        <li
          className={`text-xl font-bold ${
            isActive("/settings") ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
          }`}
        >
          <Link to="/settings">Settings</Link>
        </li>
        <li className="text-xl font-bold text-red-500 hover:text-red-500">
          <button
            onClick={() => handleLogout(navigate)} // Use the handleLogout function
            className="w-full text-left"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

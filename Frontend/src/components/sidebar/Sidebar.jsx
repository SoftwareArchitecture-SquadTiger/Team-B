import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Sidebar() {
  const location = useLocation(); // Get the current route

  const isActive = (path) => location.pathname === path; // Check if the current route matches

  return (
    <div className="w-1/5 h-screen bg-gray-100 p-4">
      <h1 className="text-black text-2xl font-bold mb-14">
        <FavoriteBorderIcon className="mr-2 text-pink-500" /> Charitan
      </h1>
      <ul className="space-y-12">
        <li className={`flex items-center text-xl font-bold cursor-pointer ${isActive('/dashboard') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}>
          <Link to="/dashboard" className="flex items-center">

            Dashboard
          </Link>
        </li>
        <li className={`flex items-center text-xl font-bold cursor-pointer ${isActive('/statistics') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}>
          <Link to="/statistics" className="flex items-center">

            Statistics
          </Link>
        </li>
        <li className={`flex items-center text-xl font-bold cursor-pointer ${isActive('/users') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}>
          <Link to="/users" className="flex items-center">

            Users
          </Link>
        </li>
        <li className={`flex items-center text-xl font-bold cursor-pointer ${isActive('/projects') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}>
          <Link to="/projects" className="flex items-center">

            Projects
          </Link>
        </li>
        <li className={`flex items-center text-xl font-bold cursor-pointer ${isActive('/settings') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}>
          <Link to="/settings" className="flex items-center">

            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
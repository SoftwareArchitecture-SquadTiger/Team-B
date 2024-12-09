import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import ProjectIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Sidebar() {
  return (
    <div className="w-1/5 h-screen bg-gray-100 p-4">
      <h1 className="text-black text-2xl font-bold mb-14">
        <FavoriteBorderIcon className="mr-2 text-pink-500" />Charitan </h1>
      <ul className="space-y-12">
        <li className="flex items-center text-xl text-gray-700 font-bold hover:text-pink-500 cursor-pointer">
          <DashboardIcon className="mr-2" /> Dashboard
        </li>
        <li className="flex items-center text-xl text-gray-700 font-bold text-pink-500 cursor-pointer">
          <BarChartIcon className="mr-2" /> Statistics
        </li>
        <li className="flex items-center text-xl text-gray-700 font-bold hover:text-pink-500 cursor-pointer">
          <PeopleIcon className="mr-2" /> Users
        </li>
        <li className="flex items-center text-xl text-gray-700 font-bold hover:text-pink-500 cursor-pointer">
          <ProjectIcon className="mr-2" /> Projects
        </li>
        <li className="flex items-center text-xl text-gray-700 font-bold hover:text-pink-500 cursor-pointer">
          <SettingsIcon className="mr-2" /> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

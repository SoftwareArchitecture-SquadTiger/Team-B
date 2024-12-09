import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import StatisticsFilter from './components/statistics/StatisticsFilter';
import StatisticsChart from './components/statistics/StatisticsChart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Hi, Admin</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <PersonOutlineIcon/> 
            </div>
          </div>
        </div>
        <StatisticsFilter />
        <StatisticsChart />
      </div>
    </div>
  );
}

export default App;

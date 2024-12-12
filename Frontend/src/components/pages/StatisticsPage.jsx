import React from 'react';
import StatisticsFilter from '../statistics/StatisticsFilter';
import StatisticsChart from '../statistics/StatisticsChart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function StatisticsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Hi, Admin</span>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <PersonOutlineIcon />
          </div>
        </div>
      </div>
      <StatisticsFilter />
      <StatisticsChart />
    </>
  );
}

export default StatisticsPage;

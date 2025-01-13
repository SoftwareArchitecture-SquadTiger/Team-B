import React from 'react';

function StatisticsFilter() {
  return (
    <div className="flex space-x-4 mb-4">
      <select className="p-2 border rounded-md text-gray-700">
        <option>2024</option>
        <option>2025</option>
      </select>

    </div>
  );
}

export default StatisticsFilter;
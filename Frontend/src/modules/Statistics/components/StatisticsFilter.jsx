import React from 'react';

function StatisticsFilter() {
  return (
    <div className="flex space-x-4 mb-4">
      <select className="p-2 border rounded-md text-gray-700">
        <option>Monthly</option>
        <option>Yearly</option>
      </select>

    </div>
  );
}

export default StatisticsFilter;
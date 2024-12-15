import React from 'react';

function StatisticsFilter() {
  return (
    <div className="flex space-x-4 mb-4">
      <select className="p-2 border rounded-md text-gray-700">
        <option>Project Count</option>
        <option>Donation Value</option>
      </select>
      <select className="p-2 border rounded-md text-gray-700">
        <option>Monthly</option>
        <option>Yearly</option>
      </select>
      <select className="p-2 border rounded-md text-gray-700">
        <option>Global</option>
        <option>Vietnam</option>
        <option>China</option>
        <option>Germany</option>
        <option>Ukraine</option>
      </select>
      <select className="p-2 border rounded-md text-gray-700">
        <option>Food</option>
        <option>Health</option>
        <option>Education</option>
        <option>Housing</option>
        <option>Humanitarian</option>
        <option>Environment</option>
        <option>Religion</option>
      </select>
    </div>
  );
}

export default StatisticsFilter;

import React from "react";
import ProjectTable from "../../Projects/components/Dashboard/ProjectTable";
import StatisticsDonationAmount from "../../Statistics/components/StatisticsDashboard/StatisticsDonationAmount"
import StatisticsPieChartForCategory from "../../Statistics/components/StatisticsPieChart/Category";
import StatisticsPieChartForCountry from "../../Statistics/components/StatisticsPieChart/Country";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-6">
                  <div className="flex justify-between items-center mb-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            </div>

      {/* Top Section: Cards and Donation Chart */}
      <div className="flex justify-between mb-8">
        {/* Cards */}
        <div className="flex flex-col space-y-4 w-1/5">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center w-56 mb-12 ">
            <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Donors</h1>
            <p className="text-3xl font-medium text-black">44</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center w-56">
            <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Charities</h1>
            <p className="text-3xl font-medium text-black">23</p>
          </div>
        </div>

        {/* Donation Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 flex-1 ml-8">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Donation Amount</h3>
          <StatisticsDonationAmount />
        </div>
      </div>

      {/* Bottom Section: Pie Charts */}
      <div className="flex  ">        
        {/* Project Table */}
        <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
          <ProjectTable />
        </div>
        <div className="flex bg-white shadow-md rounded-lg p-6 w-min">
          <StatisticsPieChartForCategory />
          <StatisticsPieChartForCountry />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

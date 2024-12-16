import React from "react";
import ProjectTable from "../../Projects/components/Dashboard/ProjectTable";
import DonationAmountChart from "../../Statistics/components/StatisticsDashboard/DonationAmountChart";
import StatisticsPieChartForCategory from "../../Statistics/components/StatisticsPieChart/Category";
import StatisticsPieChartForCountry from "../../Statistics/components/StatisticsPieChart/Country";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-6">

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
          <DonationAmountChart />
        </div>
      </div>

      {/* Bottom Section: Pie Charts */}
      <div className="flex justify-between mb-8 ">        
        {/* Project Table */}
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
          <ProjectTable />
        </div>
        <div className="flex bg-white shadow-md rounded-lg p-6 w-1/2">
          <StatisticsPieChartForCategory />
          <StatisticsPieChartForCountry />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

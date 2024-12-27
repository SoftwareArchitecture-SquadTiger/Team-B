import React from "react";
import ProjectTable from "../../Projects/components/ProjectTable";
import StatisticsDonationAmount from "../../Statistics/components/StatisticsDashboard/StatisticsDonationAmount";
import StatisticsPieChartForCategory from "../../Statistics/components/StatisticsPieChart/Category";
import StatisticsPieChartForCountry from "../../Statistics/components/StatisticsPieChart/Country";
import DonorsCard from "../components/DonorsCard"
import CharitiesCard from "../components/CharitiesCard";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex justify-between gap-4 mb-8">
        {/* Cards */}
        <div className="flex flex-wrap space-y-4 w-full flex-col md:w-1/4">
          <DonorsCard />
          <CharitiesCard />
        </div>

        {/* Donation Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 flex-1 w-full md:w-3/4">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Donation Amount</h3>
          <StatisticsDonationAmount />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Project Table */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <ProjectTable />
        </div>

        {/* Pie Charts */}
        <div className="flex flex-wrap bg-white shadow-md rounded-lg p-6 w-full md:w-2/3">
          <div className="w-full lg:w-1/2">
            <StatisticsPieChartForCategory />
          </div>
          <div className="w-full lg:w-1/2">
            <StatisticsPieChartForCountry />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

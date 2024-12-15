import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  const chartData = [1000, 2000, 1500, 2500, 3000, 4000, 3500, 2000, 2700, 3100, 3700, 4200];
  const chartLabels = ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec', '7 Dec', '8 Dec', '9 Dec', '10 Dec', 'Yesterday', 'Today'];

  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-6">
 
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>


      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Donation Amount</h3>
        <LineChart
          xAxis={[
            {
              data: chartLabels,
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: chartData,
              area: true,
              color: "#FB1465",
            },
          ]}
          width={1000}
          height={300}
        />
      </div>

      {/* Cards Section */}
      <div className="flex justify-center space-x-24">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-56">
          <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Dornors</h1>
          <p className="text-3xl font-medium text-black">44</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-56">
        <h3 className="text-lg font-medium text-gray-500 mb-2">All</h3>
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Charities</h1>
          <p className="text-3xl font-medium text-black">22</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-56">
        <h3 className="text-lg font-medium text-gray-500 mb-2">Donation</h3>
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Amount</h1>
          <p className="text-3xl font-medium text-black">$500,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

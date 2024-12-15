import React from "react";
import StatisticsChart from "./StatisticsChart";
import StatisticsFilter from "./StatisticsFilter";
import StatisticsAreaChart from "./StatisticsAreaChart"
import StatisticsPieChartForCategory from "./StatisticsPieChartForCategory";
import StatisticsPieChartForCountry from "./StatisticsPieChartForCountry";

function Statistics() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
            </div>
            <StatisticsFilter />
            <div>
                <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Project Count Per Month</h3>
                <div className="flex justify-center items-center">
                    <StatisticsChart />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Total Amount Per Month</h3>
                <div className="flex justify-center items-center">
                    <StatisticsAreaChart />
                </div>
            </div>
            <div className="flex justify-center items-center mt-12">
                <div className="mx-4">
                    <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Project Count Per Category</h3>
                    <StatisticsPieChartForCategory />
                </div>
                <div className="mx-4">
                    <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Project Count Per Country</h3>
                    <StatisticsPieChartForCountry />
                </div>
            </div>
        </div>
    );
}
export default Statistics;
import React, { useEffect } from "react";
import StatisticProjectCount from "../components/StatisticsProjectCount"
import StatisticsTotalAmount from "../components/StatisticsTotalAmount"
import StatisticsPieChartForCategory from "../components/StatisticsPieChart/Category";
import StatisticsPieChartForCountry from "../components/StatisticsPieChart/Country";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../../services/handleValidateToken";

function StatisticsPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const validateToken = async () => {
          const userData = await validateUser(navigate);
          if(!userData) return;
        }
        validateToken();
      })
    return (
        <div>
            <div className="flex justify-between items-center mb-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
            </div>
            <div>
                <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Project Count Per Month</h3>
                <div className="flex justify-center items-center">
                    <StatisticProjectCount />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-medium text-black mb-8 mt-8 text-center">Total Amount Per Month</h3>
                <div className="flex justify-center items-center">
                    <StatisticsTotalAmount />
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
export default StatisticsPage;
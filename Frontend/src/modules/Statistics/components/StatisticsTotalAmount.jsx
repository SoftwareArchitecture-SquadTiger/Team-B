import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { fetchDonationChartData } from '../services/amountByMonth/fetchDonationData';

export default function DonationLineChart() {
  const [months, setMonths] = useState([]); // X-axis labels
  const [totalAmounts, setTotalAmounts] = useState([]); // Y-axis data

  useEffect(() => {
    const loadDonationData = async () => {
      try {
        const startMonth = "2024-01";
        const endMonth = "2025-01";
        const { months, amounts } = await fetchDonationChartData(startMonth, endMonth); // Fetch and format data
        setMonths(months);
        setTotalAmounts(amounts);
      } catch (error) {
        console.error('Error loading donation data:', error.message);
      }
    };

    loadDonationData();
  }, []);

  return (
    <LineChart
      xAxis={[
        {
          data: months, // Use dynamically fetched months
          scaleType: 'point',
        },
      ]}
      series={[
        {
          label: 'Monthly Donation Amount',
          data: totalAmounts, // Use dynamically fetched amounts
          area: true,
          color: '#FB1465',
        },
      ]}
      width={900}
      height={400}
    />
  );
}

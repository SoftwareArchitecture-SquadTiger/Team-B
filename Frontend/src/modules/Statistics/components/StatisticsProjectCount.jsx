import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { fetchChartData } from '../services/projectPerMonth/fetchProjectByMonth';

const chartSetting = {
  yAxis: [
    {
      
    },
  ],
  width: 900,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

// Helper function to format values
function valueFormatter(value) {
  return `${value} Project(s)`;
}

export default function StatisticsChart() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const startMonth = "2024-01";
        const endMonth = "2025-02";
        const data = await fetchChartData(startMonth, endMonth); // Fetch and format the data
        setDataset(data); // Update the state with the formatted data
      } catch (error) {
        console.error('Error loading chart data:', error.message);
      }
    };

    loadChartData();
  }, []);

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'project', label: 'Monthly Project Count', valueFormatter, color: '#FB1465' },
      ]}
      {...chartSetting}
    />
  );
}

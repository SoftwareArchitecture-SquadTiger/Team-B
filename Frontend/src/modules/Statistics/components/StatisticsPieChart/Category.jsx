import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchCategoryData } from '../../services/projectByCategory/fetchProjectByCategory';

export default function StatisticsPieChartForCategory() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const data = await fetchCategoryData(); // Call the separated fetch function
        setCategoryData(data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error loading category data:", error.message);
      }
    };

    loadCategoryData();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: categoryData, // Use the data directly from the state
        },
      ]}
      width={600}
      height={300}
    />
  );
}

import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchCountryData } from '../../services/projectByCountry/fetchProjectByCountry';

export default function StatisticsPieChartForCountry() {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const data = await fetchCountryData(); // Fetch and format the data
        setCountryData(data); // Update the state with the formatted data
      } catch (error) {
        console.error('Error loading country data:', error.message);
      }
    };

    loadCountryData();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: countryData, // Use the fetched and formatted data
        },
      ]}
      width={500}
      height={300}
    />
  );
}

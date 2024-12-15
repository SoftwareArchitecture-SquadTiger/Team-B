import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function StatisticsPieChartForCountry() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Global' },
            { id: 1, value: 15, label: 'Vietnam' },
            { id: 2, value: 20, label: 'Germany' },
            { id: 3, value: 20, label: 'China' },
            { id: 4, value: 20, label: 'Ukraine' },
            { id: 5, value: 20, label: 'Australia' },
            

          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

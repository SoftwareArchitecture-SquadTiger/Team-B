import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function StatisticsPieChartForCategory() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Health' },
            { id: 1, value: 15, label: 'Food' },
            { id: 2, value: 20, label: 'Environment' },
            { id: 3, value: 20, label: 'Housing' },
            { id: 4, value: 20, label: 'Education' },
            { id: 5, value: 20, label: 'Religion' },
            { id: 6, value: 4, label: 'Humanitarian', color: 'pink' },

          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicArea() {
  return (
    <LineChart
      xAxis={[
        {
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          scaleType: 'point', 
        },
      ]}
      series={[
        { label: 'Monthly Project Count', 
          data: [927, 1992, 1234, 1524, 5234, 7332, 3251, 8623, 5237, 7634, 8154, 5561], 
          area: true,
          color: '#FB1465', 
        },
      ]}
      width={1000}
      height={600}
    />
  );
}

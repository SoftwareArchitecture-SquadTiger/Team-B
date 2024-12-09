import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from './ProjectCount';

const chartSetting = {
  yAxis: [
    {
      label: 'project(s)',
    },
  ],
  width: 1000,
  height: 600,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

export default function StatisticsChart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'project', label: 'Monthly Project Count', valueFormatter, color: '#FB1465'}
      ]}
      
      {...chartSetting}
    />
  );
}
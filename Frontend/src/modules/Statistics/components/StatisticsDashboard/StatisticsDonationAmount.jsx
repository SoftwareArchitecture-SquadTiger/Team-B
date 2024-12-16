import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function DonationAmountChart() {
    
    return (
    <LineChart
      xAxis={[
        {
          data: ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec', '7 Dec', '8 Dec', '9 Dec', '10 Dec', 'Yesterday', 'Today'],
          scaleType: 'point', 
        },
      ]}
      series={[
        { label: 'Donation Amount', 
          data: [1000, 2000, 1500, 2500, 3000, 4000, 3500, 2000, 2700, 3100, 3700, 4200], 
          area: true,
          color: '#FB1465', 
        },
      ]}
      width={1100}
      height={300}
    />

    );
  }
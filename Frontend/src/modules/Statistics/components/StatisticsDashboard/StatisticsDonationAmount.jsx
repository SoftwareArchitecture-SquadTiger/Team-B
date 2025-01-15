import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { handleFetchDonationData } from "../../services/amountPerDay/fetchDonationData";

export default function DonationAmountChart() {
  const [dates, setDates] = useState([]); // X-axis labels
  const [totalAmounts, setTotalAmounts] = useState([]); // Y-axis data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { formattedDates, formattedAmounts } = await handleFetchDonationData();
        setDates(formattedDates); // Set x-axis labels
        setTotalAmounts(formattedAmounts); // Set y-axis data
      } catch (error) {
        console.error("Error fetching donation data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <LineChart
      xAxis={[
        {
          data: dates, // Dynamically formatted x-axis labels
          scaleType: "point",
        },
      ]}
      series={[
        {
          label: "Donation Amount",
          data: totalAmounts, // Dynamically fetched y-axis data
          area: true,
          color: "#FB1465",
        },
      ]}
      width={1100}
      height={300}
    />
  );
}

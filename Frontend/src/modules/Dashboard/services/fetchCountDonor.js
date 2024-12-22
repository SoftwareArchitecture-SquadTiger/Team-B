import { useState, useEffect } from "react";
import { callDonorAPI } from "../hooks/callDonorAPI";

const useDonorCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getDonorCount = async () => {
      const donorCount = await callDonorAPI();
      setCount(donorCount);
    };

    getDonorCount();
  }, []);

  return count;
};

export default useDonorCount;

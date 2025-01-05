import { useState, useEffect } from "react";
import { callCharityAPI } from "../hooks/callCharityAPI";

const useCharityCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCharityCount = async () => {
      const charityCount = await callCharityAPI();
      setCount(charityCount);
    };

    getCharityCount();
  }, []);

  return count;
};

export default useCharityCount;

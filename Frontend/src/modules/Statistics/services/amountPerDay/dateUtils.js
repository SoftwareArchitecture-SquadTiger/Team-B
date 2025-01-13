export const getLast12Days = () => {
    const today = new Date();
    const dates = [];
  
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      dates.push(formattedDate);
    }
  
    return dates;
  };
  
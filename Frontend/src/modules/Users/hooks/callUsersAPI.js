export const callUsersAPI = async (url) => {
    try {
      // Fetch donors and charities simultaneously
      const [donorsResponse, charitiesResponse] = await Promise.all([
        fetch(`${url}/admin-server/donors`),
        fetch(`${url}/admin-server/charities`),
      ]);
  
      // Check if responses are OK
      if (!donorsResponse.ok) throw new Error("Failed to fetch donors");
      if (!charitiesResponse.ok) throw new Error("Failed to fetch charities");
  
      // Parse JSON responses
      const donorsData = await donorsResponse.json();
      const charitiesData = await charitiesResponse.json();
  
      return { donorsData: donorsData.data, charitiesData: charitiesData.data };
    } catch (error) {
      throw error; // Pass the error up the chain for handling
    }
  };
  
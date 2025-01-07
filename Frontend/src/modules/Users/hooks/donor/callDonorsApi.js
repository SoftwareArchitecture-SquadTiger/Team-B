export const callDonorsApi = async (url) => {
    try {
        const donorsResponse = await fetch( (`${url}/admin-server/donors`),);
    
        if (!donorsResponse.ok) throw new Error("Failed to fetch donors");
    
        const donorsData = await donorsResponse.json();
    
    
        console.log("Donors Data:", donorsData); // Debug log
    
    
        return {
          donorsData: donorsData.data || [], // Ensure fallback
    
        };
      } catch (error) {
        console.error("API Error:", error.message);
        throw error;
      }
    };
    
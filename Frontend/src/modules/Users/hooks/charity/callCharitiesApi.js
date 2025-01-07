export const callCharitiesApi = async (url) => {
    try {
        const charitiesResponse = await fetch( (`${url}/admin-server/charities`),);
    
        if (!charitiesResponse.ok) throw new Error("Failed to fetch charities");
    
        const charitiesData = await charitiesResponse.json();
    
    
        console.log("Charities Data:", charitiesData); // Debug log
    
    
        return {
          charitiesData: charitiesData.data || [], // Ensure fallback
    
        };
      } catch (error) {
        console.error("API Error:", error.message);
        throw error;
      }
    };
  
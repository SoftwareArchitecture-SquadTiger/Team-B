import { GET_CHARITIES_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callCharitiesApi(){
    try {
        const charitiesResponse = await fetch( GET_CHARITIES_SERVICE_URL);
    
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

    export default callCharitiesApi;
  
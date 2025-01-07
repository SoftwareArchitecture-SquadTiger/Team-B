import { GET_DONORS_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callDonorsApi(){
    try {
        const donorsResponse = await fetch( GET_DONORS_SERVICE_URL);
    
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

    export default callDonorsApi;
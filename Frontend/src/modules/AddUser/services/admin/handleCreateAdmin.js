import { createAdminApi } from "../../hooks/admin/callCreateAdminApi";

export const handleCreateAdmin = async (formData) => {
      const payload = {
        email: formData.email,
        password: formData.password,
        userType:"Admin"
      };
    
      try {
        const response = await createAdminApi(payload); // Call the API
        return response; // Return response for success handling
      } catch (error) {
        throw error; // Propagate error for UI handling
      }
};

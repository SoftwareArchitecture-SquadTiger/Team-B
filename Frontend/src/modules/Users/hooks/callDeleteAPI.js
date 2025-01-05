export const deleteCharityById = async (url, userId) => {
    const response = await fetch(`${url}/admin-server/charity/delete/${userId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete the charity");
    }
  
    return true; // Indicate successful deletion
  };
  
  export const deleteDonorById = async (url, userId) => {
    const response = await fetch(`${url}/admin-server/donor/delete/${userId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete the donor");
    }
  
    return true; // Indicate successful deletion
  };
  
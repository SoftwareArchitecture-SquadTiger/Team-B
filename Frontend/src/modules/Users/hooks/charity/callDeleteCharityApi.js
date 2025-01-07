export const callDeleteCharityApi = async (url, userId) => {
    const response = await fetch(`${url}/admin-server/charity/delete/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the charity");
    }
    return true;
  };
  
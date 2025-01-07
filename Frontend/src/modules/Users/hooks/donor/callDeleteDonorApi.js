export const callDeleteDonorApi = async (url, userId) => {
    const response = await fetch(`${url}/admin-server/donor/delete/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the donor");
    }
    return true;
  };
  
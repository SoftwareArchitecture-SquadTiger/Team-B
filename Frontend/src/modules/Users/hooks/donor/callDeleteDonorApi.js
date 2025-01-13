import { DELETE_DONOR_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callDeleteDonorApi(userId) {
  const response = await fetch(`${DELETE_DONOR_SERVICE_URL}/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete the donor with ID: ${userId}`);
  }

  return true;
}

export default callDeleteDonorApi;

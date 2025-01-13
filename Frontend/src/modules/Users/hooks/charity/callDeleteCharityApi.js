import { DELETE_CHARITY_SERVICE_URL } from "../../../../services/BackendUrlConfig";

async function callDeleteCharityApi(userId) {
  const response = await fetch(`${DELETE_CHARITY_SERVICE_URL}/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete the charity with ID: ${userId}`);
  }

  return true;
}

export default callDeleteCharityApi;

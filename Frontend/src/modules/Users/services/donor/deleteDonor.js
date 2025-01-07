import { callDeleteDonorApi } from "../../hooks/donor/callDeleteDonorApi";

export const handleDeleteDonor = async (userId, donors, setDonors, url) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the user with ID: ${userId}?`
  );
  if (confirmDelete){
  try {
    await callDeleteDonorApi(url, userId);
    const updatedDonors = donors.filter((donor) => donor._id !== userId);
    setDonors(updatedDonors);
    console.log(`User with ID ${userId} deleted successfully!`);
    alert("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting charity:", error);
    alert("An error occurred while deleting the donor. Please try again.");
  }
}
};



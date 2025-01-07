import callDeleteDonorApi from "../../hooks/donor/callDeleteDonorApi";

export const handleDeleteDonor = async (userId, donors, setDonors) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the Donor with ID: ${userId}?`
  );

  if (confirmDelete) {
    try {
      await callDeleteDonorApi(userId);
      const updatedDonors = donors.filter((donor) => donor.id !== userId);
      setDonors(updatedDonors);
      console.log(`Donor with ID ${userId} deleted successfully!`);
      alert("Donor deleted successfully!");
    } catch (error) {
      console.error("Error deleting donor:", error.message);
      alert("An error occurred while deleting the donor. Please try again.");
    }
  }
};

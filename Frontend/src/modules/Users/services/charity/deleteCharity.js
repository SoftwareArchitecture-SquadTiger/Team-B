import callDeleteCharityApi from "../../hooks/charity/callDeleteCharityApi";

export const handleDeleteCharity = async (userId, charities, setCharities) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the Charity with ID: ${userId}?`
  );

  if (confirmDelete) {
    try {
      await callDeleteCharityApi(userId);
      const updatedCharities = charities.filter((charity) => charity.id !== userId);
      setCharities(updatedCharities);
      console.log(`Charity with ID ${userId} deleted successfully!`);
      alert("Charity deleted successfully!");
    } catch (error) {
      console.error("Error deleting charity:", error.message);
      alert("An error occurred while deleting the charity. Please try again.");
    }
  }
};

import { deleteDonorById } from "../hooks/callDeleteAPI";

const handleDeleteDonor = async (userId, users, setUsers, url) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the user with ID: ${userId}?`
  );

  if (confirmDelete) {
    try {
      // Call the API to delete the donor
      await deleteDonorById(url, userId);

      // Update the state after successful deletion
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      console.log(`User with ID ${userId} deleted successfully!`);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert("An error occurred while deleting the donor. Please try again.");
    }
  }
};

export default handleDeleteDonor;

const handleDeleteDonor = async (userId, users, setUsers, url) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the user with ID: ${userId}?`
  );

  if (confirmDelete) {
    try {
      // Correct API endpoint
      const response = await fetch(`${url}/admin-server/donor/delete/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the donor");
      }

      // Update the state after successful deletion
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      console.log(`Donor with ID ${userId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  }
};

export default handleDeleteDonor;

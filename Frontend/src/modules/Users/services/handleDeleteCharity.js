const handleDeleteCharity = async (userId, users, setUsers, url) => {
    try {
      // Correct API endpoint
      const response = await fetch(`${url}/admin-server/charity/delete/${userId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the charity");
      }
  
      // Update the state after successful deletion
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
  
      console.log(`Charity with ID ${userId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting charity:", error);
    }
  };
  
  export default handleDeleteCharity;
  
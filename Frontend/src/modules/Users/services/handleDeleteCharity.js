import { deleteCharityById } from "../hooks/callDeleteAPI";

const handleDeleteCharity = async (userId, users, setUsers, url) => {
  try {
    // Call the API to delete the charity
    await deleteCharityById(url, userId);

    // Update the state after successful deletion
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    console.log(`User deleted successfully!`);
  } catch (error) {
    console.error("Error deleting charity:", error);
  }
};

export default handleDeleteCharity;

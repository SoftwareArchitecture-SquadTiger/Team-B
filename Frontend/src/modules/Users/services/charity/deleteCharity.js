import { callDeleteCharityApi } from "../../hooks/charity/callDeleteCharityApi";

export const handleDeleteCharity = async (userId, charities, setCharities, url) => {
    const confirmDelete = window.confirm(
        `Are you sure you want to delete the user with ID: ${userId}?`
    );
    if (confirmDelete) {
        try {
            await callDeleteCharityApi(url, userId);
            const updatedCharities = charities.filter((charity) => charity._id !== userId);
            setCharities(updatedCharities);
            console.log(`User with ID ${userId} deleted successfully!`);
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting charity:", error);
            alert("An error occurred while deleting the charity. Please try again.");
        }
    }

};

import { logoutUser } from "../hook/callLogoutApi";
import { useNavigate } from "react-router-dom";

export const handleLogout = async (navigate) => {

  try {
    await logoutUser();
    navigate("/login"); 
  } catch (error) {
    console.error("Error during logout:", error);
    alert(`Error logging out: ${error.message}`);
  }
};

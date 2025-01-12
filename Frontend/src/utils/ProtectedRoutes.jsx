import { Outlet, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAPI } from "../state/APIContext";

const ProtectedRoutes = ({children}) => {
    const { authToken } = useAPI();
// Check token
if(!authToken){
    return <Navigate to="/login" replace />;
}
    return children;
};

export default ProtectedRoutes;
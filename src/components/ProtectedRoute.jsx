import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
    const userId = useSelector(state => state.auth.userId);
    
    if (!userId) {
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
    }

    return children ? children : <Outlet />;
};
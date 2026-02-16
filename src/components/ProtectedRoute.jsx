import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    if (!isAuthenticated) {
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
    }

    return children ? children : <Outlet />;
};
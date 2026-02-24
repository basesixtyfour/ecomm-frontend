import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, staffOnly = false }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    
    if (!isAuthenticated) {
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
    }

    if (staffOnly && !user?.is_staff) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />;
};

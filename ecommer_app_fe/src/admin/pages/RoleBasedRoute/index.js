import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, requiredPermissions }) => {
    const { role } = useSelector(state => state.AuthReducer);
    const permissions = role?.permissions || [];

    
    if (requiredPermissions && !requiredPermissions.every(permission => permissions.includes(permission))) {
        return <Navigate to="/admin/403" replace />;
    }

    return children;
};

export default RoleBasedRoute;

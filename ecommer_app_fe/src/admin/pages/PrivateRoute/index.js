import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAction } from "../../../redux/actions/AuthAction";

const PrivateRoute = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || "");
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.AuthReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuth = async () => {
            if (accessToken) {
                dispatch(checkAuthAction()); // Assuming this action updates the Redux state
            }
        };

        fetchAuth();
    }, [accessToken, dispatch,navigate]);

    // Check if the token exists in Redux or localStorage
    if (!selector.access_token && !accessToken) {
        // Redirect to login if no valid token
        return <Navigate to="/admin/auth/login" replace />;
    }

    // If the token exists, allow access to the route
    return children;
};

export default PrivateRoute;

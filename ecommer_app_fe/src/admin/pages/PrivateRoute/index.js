// import axios from "axios";
import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthApi } from "../../../utils/api";

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem("access_token");
    const [res,setRes] = useState();

    useEffect(()=>{
        const fetch = async()=>{
            const tmp = await checkAuthApi();
            setRes(tmp)
        }
        fetch()
    },[accessToken])
    
    if ( res&& res.code!=200) {
        // If there is no token, redirect to the login page
        return <Navigate to="/admin/auth/login" replace />;
    }

    // If the token exists, allow access to the route
    return children;
};

export default PrivateRoute;

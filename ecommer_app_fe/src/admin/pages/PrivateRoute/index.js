// import axios from "axios";
import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthApi } from "../../../utils/api";
import {useDispatch, useSelector} from "react-redux"
import { checkAuthAction } from "../../../redux/actions/AuthAction";
// import useSelection from "antd/es/table/hooks/useSelection";

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem("access_token");
    // const role = localStorage.getItem("role");
    // const [res,setRes] = useState();
    const dispatch = useDispatch()
    const selector = useSelector(state=>state.AuthReducer)
    // let tmp;
    useEffect(()=>{
        const fetch = async()=>{
            dispatch(checkAuthAction())
            // setRes(tmp)
        }
        fetch()
    },[accessToken,dispatch])
    


    // console.log( selector.account  );
    
    if (  !selector.access_token && !accessToken ) {
        // If there is no token, redirect to the login page
        return <Navigate to="/admin/auth/login" replace />;
    }

    // If the token exists, allow access to the route
    return children;
};

export default PrivateRoute;

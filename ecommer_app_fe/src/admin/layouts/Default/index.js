import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Result, Button } from "antd";
import { checkAuthAction } from "../../../redux/actions/AuthAction";

function Default() {
    const [collapsed, setCollapsed] = useState(false);
    // const [auth, setAuth] = useState(localStorage.getItem("access_token"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateAuth = useSelector(state => state.AuthReducer);
    const [accessToken,setAccessToken] = useState(localStorage.getItem("access_token"));

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const dataOutlet = {
        collapsed: collapsed,
    };

    // Gọi lại API khi trang reload để kiểm tra quyền và cập nhật thông tin auth
    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if(!access_token){
            navigate("/admin/auth/login")
        }
        else{
            if(stateAuth.access_token!=accessToken){
            navigate("/admin/auth/login")

            }
        }
    }, [ dispatch, navigate,accessToken]);

    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const newToken = localStorage.getItem("access_token");
    //         if (newToken !== auth) {
    //             setAuth(newToken);
    //             // Có thể reload hoặc gọi API khác để cập nhật state
    //             window.location.reload(); // Reload lại trang để cập nhật auth
    //         }
    //     };

    //     window.addEventListener("storage", handleStorageChange);

    //     // Clean up sự kiện khi unmount component
    //     return () => {
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, [auth]);
    // console.log(stateAuth);
    const handle = ()=>{
        localStorage.removeItem("access_token")
        navigate('/admin/auth/login')
    }

    return (
        <>
            {stateAuth.access_token? (
                <>
                    <Header className=""/>
                    <div className="">
                        <Sider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                        <Outlet context={dataOutlet} />
                    </div>
                </>
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
                    extra={
                        <Button type="primary" onClick={handle}>
                            Quay lại trang đăng nhập
                        </Button>
                    }
                />
            )}
        </>
    );
}

export default Default;

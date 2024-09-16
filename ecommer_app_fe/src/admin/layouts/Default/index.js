import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Result, Button } from "antd";
import { checkAuthAction } from "../../../redux/actions/AuthAction";

function Default() {
    const [collapsed, setCollapsed] = useState(false);
    const [auth, setAuth] = useState(localStorage.getItem("access_token"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateAuth = useSelector(state => state.AuthReducer);
    
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const dataOutlet = {
        collapsed: collapsed,
    };

    // Gọi lại API khi trang reload để kiểm tra quyền và cập nhật thông tin auth
    useEffect(() => {
        if (auth) {
            dispatch(checkAuthAction()); // Gọi API kiểm tra lại auth khi reload
        } else {
            navigate('/admin/auth/login'); // Nếu không có token, điều hướng về trang đăng nhập
        }
    }, [auth, dispatch, navigate]);

    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem("access_token");
            if (newToken !== auth) {
                setAuth(newToken);
                // Có thể reload hoặc gọi API khác để cập nhật state
                window.location.reload(); // Reload lại trang để cập nhật auth
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Clean up sự kiện khi unmount component
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [auth]);

    return (
        <>
            {stateAuth.role && stateAuth.role.permissions && stateAuth.role.permissions.length > 0 ? (
                <>
                    <Header />
                    <div className="body">
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
                        <Button type="primary" onClick={() => navigate('/admin/auth/login')}>
                            Quay lại trang đăng nhập
                        </Button>
                    }
                />
            )}
        </>
    );
}

export default Default;

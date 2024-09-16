import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useEffect, useState } from 'react';

function Default() {
    const [collapsed, setCollapsed] = useState(false);
    const [auth, setAuth] = useState(localStorage.getItem("access_token"));

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const dataOutlet = {
        collapsed: collapsed,
    };

    // Update auth state when access_token changes
    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem("access_token");
            if (newToken !== auth) {
                setAuth(newToken);
                // Reload page or trigger other actions as needed
                window.location.reload(); // Optional: reload the page if necessary
            }
        };

        window.addEventListener("storage", handleStorageChange);
        
        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [auth]);

    return (
        <>
            <Header />
            <div className="body">
                <Sider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Outlet context={dataOutlet} />
            </div>
        </>
    );
}

export default Default;

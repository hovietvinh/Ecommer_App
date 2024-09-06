import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useState } from 'react';

function Default() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const dataOutlet = {
        collapsed:collapsed,
       
    }
    return (
        <>
            <Header/>
            <div className="body">
                <Sider collapsed={collapsed} toggleCollapsed={toggleCollapsed}/>
                <Outlet context={dataOutlet}/>
            </div>
        </>
    );
}

export default Default;
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DashboardOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
  import { useState } from 'react';
  import { Button, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
function Sider(props) {
    const {collapsed,toggleCollapsed} = props
    
    const items = [
        {
            key: 'toggle',
            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
            label: collapsed ? "Mở" : "",
            onClick: toggleCollapsed,
            className: 'text-white bg-transparent hover:bg-gray-700',
        },
        {
            key: '1',
            icon: <DashboardOutlined />,
            label: <NavLink to="/admin/dashboard">Tổng quan</NavLink>
        },
        {
            key: '2',
            icon: <ShoppingCartOutlined />,
            label: <NavLink to="/admin/products">Sản phẩm</NavLink>
        },
        {
            key: '3',
            icon: <PieChartOutlined />,
            label: 'Option 3',
        },
    ];
    
    
    

    return (
        <div className='w-[210px] text-white fixed top-[56px] left-0 h-screen'>
            
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                className="h-full"
            />
        </div>
    );
}

export default Sider;

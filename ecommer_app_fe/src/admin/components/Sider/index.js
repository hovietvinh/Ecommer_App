import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, FileAddOutlined, DashboardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';

function Sider(props) {
    const { collapsed, toggleCollapsed } = props;
    const location = useLocation();

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
            icon: <FileAddOutlined />,
            label: <NavLink to="/admin/products/create">Thêm sản phẩm</NavLink>,
        },
    ];

    const selectedKey = location.pathname === '/admin/products/create' ? '3' :
                        location.pathname === '/admin/products' ? '2' : '1';

    return (
        <div className='w-[210px] text-white fixed top-[56px] left-0 h-screen'>
            <Menu
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['1']}
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

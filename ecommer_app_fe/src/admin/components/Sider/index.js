import React from 'react';
import { MenuUnfoldOutlined,UserOutlined,SettingOutlined,AuditOutlined,DeleteOutlined, MenuFoldOutlined, FileAddOutlined, DashboardOutlined, ShoppingCartOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sider(props) {
    
    const { collapsed, toggleCollapsed } = props;
    const location = useLocation();
    const stateAuth = useSelector(state=>state.AuthReducer)
    // console.log(stateAuth.role.permissions);
    const userPermissions = stateAuth.role?.permissions || [];

    // Hàm kiểm tra xem người dùng có quyền cụ thể không
    const hasPermission = (code) => userPermissions.includes(code);
    // console.log(stateAuth);
    const items = [
        {
          key: 'toggle',
          icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
          label: collapsed ? "Mở" : "",
          onClick: toggleCollapsed,
          className: 'text-white bg-transparent hover:bg-gray-700',
        },
        {
          key: "/admin/dashboard",
          icon: <DashboardOutlined />,
          label: <NavLink to="/admin/dashboard">Tổng quan</NavLink>
        },
        hasPermission('products_view') && {
          key: "/admin/products",
          icon: <ShoppingCartOutlined />,
          label: <NavLink to="/admin/products">Danh sách sản phẩm</NavLink>
        },
        hasPermission('products_category_view') && {
          key: "/admin/products-category",
          icon: <UnorderedListOutlined />,
          label: <NavLink to="/admin/products-category">Danh mục sản phẩm</NavLink>
        },
        hasPermission('roles_view') && {
          key: "/admin/roles",
          icon: <AuditOutlined />,
          label: <NavLink to="/admin/roles">Nhóm quyền</NavLink>
        },
        hasPermission('roles_permissions') && {
          key: "/admin/roles/permissions",
          icon: <SettingOutlined />,
          label: <NavLink to="/admin/roles/permissions">Phân quyền</NavLink>
        },
        hasPermission("accounts_view")&& {
            key:"/admin/accounts",
            icon:<UserOutlined/>,
            label:<NavLink to="/admin/accounts">Danh sách tài khoản</NavLink>
            
        },
        {
            key:"/admin/records/delete",
            icon: <DeleteOutlined />,
            label: <NavLink to="/admin/records/delete">Thùng rác</NavLink>,
        },
      ].filter(item => item);
    // const items = [
    //     {
    //         key: 'toggle',
    //         icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
    //         label: collapsed ? "Mở" : "",
    //         onClick: toggleCollapsed,
    //         className: 'text-white bg-transparent hover:bg-gray-700',
    //     },
    //     {
    //         key: "/admin/dashboard",
    //         icon: <DashboardOutlined />,
    //         label: <NavLink to="/admin/dashboard">Tổng quan</NavLink>
    //     },
    //     {
    //         key: "/admin/products",
    //         icon: <ShoppingCartOutlined />,
    //         label: <NavLink to="/admin/products">Danh sách sản phẩm</NavLink>
    //     },
    //     {
    //         key:"/admin/products-category",
    //         icon: <UnorderedListOutlined />,
    //         label: <NavLink to="/admin/products-category">Danh mục sản phẩm</NavLink>,
    //     },
    //     {
    //         key:"/admin/roles",
    //         icon:<AuditOutlined/>,
    //         label:<NavLink to="/admin/roles">Nhóm quyền</NavLink>
    //     },
    //     {
    //         key:"/admin/roles/permissions",
    //         icon:<SettingOutlined/>,
    //         label:<NavLink to="/admin/roles/permissions">Phân quyền</NavLink>
    //     },
    //     {
    //         key:"/admin/accounts",
    //         icon:<UserOutlined/>,
    //         label:<NavLink to="/admin/accounts">Danh sách tài khoản</NavLink>
         
    //     },
    //     {
    //         key:"/admin/records/delete",
    //         icon: <DeleteOutlined />,
    //         label: <NavLink to="/admin/records/delete">Thùng rác</NavLink>,
    //     },
    
        
    // ];

    const selectedKey = location.pathname 

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

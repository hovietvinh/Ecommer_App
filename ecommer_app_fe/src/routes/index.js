import Default from "../client/layouts/Default";
import Product from "../client/pages/Product";
import DefaultAdmin from "../admin/layouts/Default";
import Dashboard from "../admin/pages/Dashboard";
import ProductAdmin from "../admin/pages/Product";
import CreateProduct from "../admin/pages/CreateProduct";
import EditProduct from "../admin/pages/EditProduct";
import DetailProduct from "../admin/pages/DetailProduct";
import DetailProductClient from "../client/pages/DetailProduct";
import ProductCategory from "../admin/pages/ProductCategory";
import CreateProductCategory from "../admin/pages/CreateProductCategory";
import RecordsDelete from "../admin/pages/RecordsDelete";
import ProductCategoryDetail from "../admin/pages/ProductCategoryDetail";
import EditProductCategory from "../admin/pages/EditProductCategory";
import Roles from "../admin/pages/Roles";
import CreateRole from "../admin/pages/CreateRole";
import EditRole from "../admin/pages/EditRole";
import RolePermissions from "../admin/pages/RolePermissions";
import Accounts from "../admin/pages/Accounts";
import CreateAccount from "../admin/pages/CreateAccount";
import Login from "../admin/pages/Login";
import PrivateRoute from "../admin/pages/PrivateRoute";
import RoleBasedRoute from "../admin/pages/RoleBasedRoute";
import { Navigate } from "react-router-dom";
import Error from "../admin/pages/403";
import Home from "../client/pages/Home";
import Search from "../client/pages/Search";
import Cart from "../client/pages/Cart";

export const routes = [
    {
        path: "/",
        element: <Default />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/products",
                element: <Product />,
            },
            {
                path: "/products/:slug",
                element:  <Product />,
            },
            {
                path:"/products/detail/:slug",
                element: <DetailProductClient/>
            },
            {
                path:"/search",
                element:<Search/>
            },
            {
                path:"/cart",
                element:<Cart/>
            }
        ],
    },
    {
        path: "/admin",
        element: <PrivateRoute><DefaultAdmin /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/admin/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <RoleBasedRoute requiredPermissions={[]}><Dashboard /></RoleBasedRoute>,
            },
            {
                path: "products",
                element: <RoleBasedRoute requiredPermissions={["products_view"]}><ProductAdmin /></RoleBasedRoute>,
            },
            {
                path: "products/create",
                element: <RoleBasedRoute requiredPermissions={["products_create"]}><CreateProduct /></RoleBasedRoute>,
            },
            {
                path: "products/edit/:id",
                element: <RoleBasedRoute requiredPermissions={["products_edit"]}><EditProduct /></RoleBasedRoute>,
            },
            {
                path: "products/detail/:id",
                element: <RoleBasedRoute requiredPermissions={["products_view"]}><DetailProduct /></RoleBasedRoute>,
            },
            {
                path: "products-category",
                element: <RoleBasedRoute requiredPermissions={["products_category_view"]}><ProductCategory /></RoleBasedRoute>,
            },
            {
                path: "products-category/create",
                element: <RoleBasedRoute requiredPermissions={["products_category_create"]}><CreateProductCategory /></RoleBasedRoute>,
            },
            {
                path: "products-category/detail/:id",
                element: <RoleBasedRoute requiredPermissions={["products_category_view"]}><ProductCategoryDetail /></RoleBasedRoute>,
            },
            {
                path: "products-category/edit/:id",
                element: <RoleBasedRoute requiredPermissions={["products_category_edit"]}><EditProductCategory /></RoleBasedRoute>,
            },
            {
                path: "records/delete",
                element: <RoleBasedRoute ><RecordsDelete /></RoleBasedRoute>,
            },
            {
                path: "roles",
                element: <RoleBasedRoute requiredPermissions={["roles_view"]}><Roles /></RoleBasedRoute>,
            },
            {
                path: "roles/create",
                element: <RoleBasedRoute requiredPermissions={["roles_create"]}><CreateRole /></RoleBasedRoute>,
            },
            {
                path: "roles/edit/:id",
                element: <RoleBasedRoute requiredPermissions={["roles_edit"]}><EditRole /></RoleBasedRoute>,
            },
            {
                path: "roles/permissions",
                element: <RoleBasedRoute requiredPermissions={["roles_permissions"]}><RolePermissions /></RoleBasedRoute>,
            },
            {
                path: "accounts",
                element: <RoleBasedRoute ><Accounts /></RoleBasedRoute>,
            },
            {
                path: "accounts/create",
                element: <RoleBasedRoute ><CreateAccount /></RoleBasedRoute>,
            },
            {
                path: "403",
                element:<Error/>
            }
        ],
    },
    {
        path: "/admin/auth/login",
        element: <Login />,
    }
];

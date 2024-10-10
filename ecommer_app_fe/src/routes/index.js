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
import Checkout from "../client/pages/Checkout";
import CheckoutSuccess from "../client/pages/CheckoutSuccees";
import Register from "../client/pages/Register";
import LoginUser from "../client/pages/Login";
import DetailRole from "../admin/pages/DetailRole";
import MyAccount from "../admin/pages/MyAccount";
import DetailAccount from "../admin/pages/DetailAccount";

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
            },
            {
                path:"/checkout",
                element:<Checkout/>
            },
            {
                path:'/checkout/success/:orderId',
                element:<CheckoutSuccess/>
            },
            {
                path:"/user/register",
                element:<Register/>
            },
            {
                path:"/user/login",
                element:<LoginUser/>
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
                element:<Dashboard />
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
                path:"roles/detail/:id",
                element:<RoleBasedRoute requiredPermissions={["roles_view"]}><DetailRole/></RoleBasedRoute>,
            },
            {
                path: "accounts",
                element: <RoleBasedRoute requiredPermissions={["accounts_view"]}><Accounts /></RoleBasedRoute>,
            },
            {
                path: "accounts/create",
                element: <RoleBasedRoute requiredPermissions={["accounts_create"]}><CreateAccount /></RoleBasedRoute>,
            },
            {
                path: "accounts/detail/:id",
                element: <RoleBasedRoute requiredPermissions={["accounts_view"]}><DetailAccount/></RoleBasedRoute>,
            },
            {
                path:"my-account",
                element:<RoleBasedRoute><MyAccount/></RoleBasedRoute>,
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

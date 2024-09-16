import Default from "../client/layouts/Default";
import Product from "../client/pages/Product";
import DefaultAdmin from "../admin/layouts/Default";
import Dashboard from "../admin/pages/Dashboard";
import ProductAdmin from "../admin/pages/Product";
import CreateProduct from "../admin/pages/CreateProduct";
import EditProduct from "../admin/pages/EditProduct";
import DetailProduct from "../admin/pages/DetailProduct";
import DetailProductClient from "../client/pages/DetailProduct"
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
import {Navigate} from "react-router-dom"
import Login from "../admin/pages/Login";

export const routes = [
    {
        path:"/",
        element:<Default/>,
        children:[  
            {
                path:"/",
                element:<>123</>
            },
            {
                path:"/products",
                element:<Product/>
            },
            {
                path:"/products/:slug",
                element:<DetailProductClient/>
            }
        ]
    },
    {
        path:"/admin",
        element:<DefaultAdmin/>,
        children:[
            {
                index: true,
                element: <Navigate to="/admin/auth/login" replace />
            },
            {
                path:"dashboard",
                element:<Dashboard/>
            },
            {
                path:"products",
                element:<ProductAdmin/>
            },
            {
                path:"products/create",
                element:<CreateProduct/>
            },
            {
                path:"products/edit/:id",
                element:<EditProduct/>
            },
            {
                path:"products/detail/:id",
                element:<DetailProduct/>
            },
            {
                path:"products-category",
                element:<ProductCategory/>
            },
            {
                path:"products-category/create",
                element:<CreateProductCategory/>
            },
            {
                path:"products-category/detail/:id",
                element:<ProductCategoryDetail/>
            },
            {
                path:"products-category/edit/:id",
                element:<EditProductCategory/>
            }
            ,
            {
                path:"records/delete",
                element:<RecordsDelete/>
            },
            {
                path:"roles",
                element:<Roles/>
            },
            {
                path:"roles/create",
                element:<CreateRole/>
            },
            {
                path:"roles/edit/:id",
                element:<EditRole/>
            },
            {
                path:"roles/permissions",
                element:<RolePermissions/>
            },
            {
                path:"accounts",
                element:<Accounts/>
            },
            {
                path:"accounts/create",
                element:<CreateAccount/>
            }
        ]
    },
    {
        path:"/admin/auth/login",
        element:<Login/>
    }
];

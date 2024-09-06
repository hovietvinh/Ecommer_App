import Default from "../client/layouts/Default";
import Product from "../client/pages/Product";
import DefaultAdmin from "../admin/layouts/Default";
import Dashboard from "../admin/pages/Dashboard";
import ProductAdmin from "../admin/pages/Product";


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
            }
        ]
    },
    {
        path:"/admin",
        element:<DefaultAdmin/>,
        children:[
            {
                path:"dashboard",
                element:<Dashboard/>
            },
            {
                path:"products",
                element:<ProductAdmin/>
            }
        ]
    }
];

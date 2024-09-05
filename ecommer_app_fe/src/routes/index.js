import Default from "../client/layouts/Default";
import Product from "../client/pages/Product";


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
    }
];

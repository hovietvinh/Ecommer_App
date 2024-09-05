import Default from "../client/layouts/Default";


export const routes = [
    {
        path:"/",
        element:<Default/>,
        children:[  
            {
                path:"/",
                element:<>123</>
            }
        ]
    }
];

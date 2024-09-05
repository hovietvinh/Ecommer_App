import {  Outlet } from "react-router-dom";

function Default() {
    return (
        <>
            <div>Header</div>
            <Outlet/>
            <div>fotter</div>
        </>
    );
}

export default Default;
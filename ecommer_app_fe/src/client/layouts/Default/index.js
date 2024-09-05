import {  Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Default() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Default;
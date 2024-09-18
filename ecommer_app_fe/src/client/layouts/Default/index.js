import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Outlet } from "react-router-dom";
import { getProductCategoryAction } from "../../../redux/client/actions/ProductCategoryAction";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Default() {
    const dispatch = useDispatch()
    const [value, setValue] = useState();
    
    const stateProductCategory = useSelector(state=>state.ProductCategoryReducerClient)
    
    useEffect(()=>{
        const fetchApi = ()=>{
            dispatch(getProductCategoryAction())
        }
        fetchApi()
    },[dispatch])
    // console.log(stateProductCategory);
    return (
        <>
            <Header value={value} setValue={setValue}/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Default;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { getProductsAction } from "../../../redux/client/actions/ProductAction";
import Carousel from "./Carousel";

function Home() {
    const dispatch = useDispatch()
    const stateProducts = useSelector(state=>state.ProductReducerClient)
    // const {loading} = useOutletContext()
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    useEffect(()=>{
        const fetchApi = async()=>{
            dispatch(getProductsAction())
            
        }
        fetchApi()
    },[dispatch])
    // console.log(stateProducts.products);
    return (
        <>
            
            <Carousel />
        </>
    );
}

export default Home;
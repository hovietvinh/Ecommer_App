import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../redux/client/actions/ProductAction";
import Carousel from "./Carousel";

function Home() {
    const dispatch = useDispatch()
    const stateProducts = useSelector(state=>state.ProductReducerClient)
    useEffect(()=>{
        const fetchApi = async()=>{
            dispatch(getProductsAction())
        }
        fetchApi()
    },[dispatch])
    // console.log(stateProducts.products);
    return (
        <>
            <Carousel/>
        </>
    );
}

export default Home;
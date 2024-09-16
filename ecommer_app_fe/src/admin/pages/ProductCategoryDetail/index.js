import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { getProductCategoryDetailAction } from '../../../redux/actions/ProductCategoryAction';
import Test from './test';

function ProductCategoryDetail() {
    const {collapsed} = useOutletContext()
    const {id} =useParams();
    const dispatch = useDispatch()
    const data = useSelector(state=>state.ProductCategoryReducer)
    useEffect(()=>{
        const axiosApi = ()=>{
            dispatch(getProductCategoryDetailAction(id))
        }
        axiosApi()
    },[dispatch,id])
    // console.log(data.productsCategory);
    

    return (
        <>
            {(data.productsCategory !== null && typeof data.productsCategory === 'object' && !Array.isArray(data.productsCategory)) &&(
                <div 
                    className={`transition-all duration-300 ${
                    collapsed
                        ? "ml-[100px] w-[calc(100%-100px)]"
                        : "ml-[230px] w-[calc(100%-230px)]"
                    } mt-[20px] mr-[20px]`}
                >
                    <Test data={data.productsCategory}/>


                </div>
            )}
            
        </>
    );
}

export default ProductCategoryDetail;
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { getProductsByKeywordAction } from '../../../redux/client/actions/ProductAction';
import BoxHead from '../../components/BoxHead';
import { Badge, Empty } from 'antd';

function Search() {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get("keyword")
    const dispatch = useDispatch()
    const stateProducts = useSelector(state=>state.ProductReducerClient)
    console.log(stateProducts.products);
    const navigate= useNavigate()
    // useEffect(()=>{
    //     dispatch(getProductsByKeywordAction(keyword))
    // })
    useEffect(()=>{
        if(keyword){
           dispatch(getProductsByKeywordAction(keyword))
        }
        else{
            navigate("/")
        }
    },[keyword])
    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    
    return (
        <>
            <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text={
                        "Kết quả tìm kiếm"
                    }/>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {stateProducts.products.length>0?(
                        stateProducts.products.map(product=>(
                        
                            <NavLink to={`/products/detail/${product.slug}`} key={product._id}   className="rounded-lg overflow-hidden border border-gray-300">
                            <Badge.Ribbon text="Nổi bật" color="red" className={product.featured === "1" ? "m-1  rounded-md" : "hidden"} >
                            <div className="w-full aspect-[4/3] border border-gray-300">
                               <img className="w-full h-full object-cover" src={product.thumbnail?product.thumbnail:"https://lh4.googleusercontent.com/proxy/IEU20xZDxGIL6f-PIiD-uSnnbAflCtBb2ZSY3tXouFuAYAi-Ehi0ijol5w075iG5KkAICJI1dSpzy6LKGrpd4mxX6A0bJNvWBFpDajmZR97wXUfbXA"}></img>
                           </div>
                           <div className="p-[15px]">
                               <h3 className="text-[20px] font-semibold">{product.title}</h3>
                               <div className="text-[18px] text-green-500 font-semibold">{getPriceNew(product.price,product.discountPercentage)}$</div>
                               <div className="text-[18px] text-red-500 font-semibold line-through	">{product.price}$</div>
                               <div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-{product.discountPercentage}%</div>
                           </div>
                            </Badge.Ribbon>
                           
                       </NavLink>
                        
                            
                        ))
                    ):(
                        <Empty/>
                    )}
                </div>
                
            </div>
        </>
    );
}

export default Search;
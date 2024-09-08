import BoxHead from "../../components/BoxHead";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../redux/actions/ProductAction";
import { useEffect } from "react";
import { Empty } from "antd";
import { NavLink } from "react-router-dom";


function Product() {
    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    const dispatch = useDispatch()
    let products = useSelector(state=>state.ProductReducer)
    useEffect(()=>{
        const fetchApi = ()=>{
             dispatch(getProductsAction())
        }
        fetchApi()
    },[dispatch])
    // console.log(products);

    return (
        <>
            <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text="Danh sách sản phẩm"/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {products.length>0?(
                        products.map(product=>(
                        
                                <NavLink to={`/products/${product.slug}`} key={product._id}  className="rounded-lg overflow-hidden border border-gray-300">
                                    <div className="w-full aspect-[4/3] border border-gray-300">
                                        <img className="w-full h-full object-cover" src={product.thumbnail?product.thumbnail:"https://lh4.googleusercontent.com/proxy/IEU20xZDxGIL6f-PIiD-uSnnbAflCtBb2ZSY3tXouFuAYAi-Ehi0ijol5w075iG5KkAICJI1dSpzy6LKGrpd4mxX6A0bJNvWBFpDajmZR97wXUfbXA"}></img>
                                    </div>
                                    <div className="p-[15px]">
                                        <h3 className="text-[20px] font-semibold">{product.title}</h3>
                                        <div className="text-[18px] text-green-500 font-semibold">{getPriceNew(product.price,product.discountPercentage)}$</div>
                                        <div className="text-[18px] text-red-500 font-semibold line-through	">{product.price}$</div>
                                        <div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-{product.discountPercentage}%</div>

                                    </div>
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

export default Product;
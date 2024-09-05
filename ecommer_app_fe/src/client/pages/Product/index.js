import BoxHead from "../../components/BoxHead";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../redux/actions/ProductAction";
import { useEffect } from "react";
import { Empty } from "antd";


function Product() {
    const dispatch = useDispatch()
    let products = useSelector(state=>state.ProductReducer)
    useEffect(()=>{
        const fetchApi = ()=>{
             dispatch(getProductsAction())
        }
        fetchApi()
    },[dispatch])
    console.log(products);

    return (
        <>
            <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text="Danh sách sản phẩm"/>
                </div>
                
                {products.length>0?(
                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-lg overflow-hidden border border-gray-300">
                            <div className="w-full aspect-[4/3] border border-gray-300">
                                <img className="w-full h-full object-cover" src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"></img>
                            </div>
                            <div className="p-[15px]">
                                <h3 className="text-[20px] font-semibold">iphone</h3>
                                <div className="text-[18px] text-green-500 font-semibold">10$</div>
                                <div className="text-[18px] text-red-500 font-semibold line-through	">10$</div>
                                <div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-20%</div>

                            </div>
                        </div>
                    </div> 
                ):(
                    <Empty/>
                )}
                

                
            </div>
        </>
    );
}

export default Product;
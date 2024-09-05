import BoxHead from "../../components/BoxHead";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../redux/actions/ProductAction";
import { useEffect } from "react";
import { Empty } from "antd";


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
    console.log(products);

    return (
        <>
            <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text="Danh sách sản phẩm"/>
                </div>
                
                {products.length>0?(
                    products.map(product=>(
                        <div key={product._id} className="grid grid-cols-3 gap-4">
                            <div className="rounded-lg overflow-hidden border border-gray-300">
                                <div className="w-full aspect-[4/3] border border-gray-300">
                                    <img className="w-full h-full object-cover" src={product.thumbnail}></img>
                                </div>
                                <div className="p-[15px]">
                                    <h3 className="text-[20px] font-semibold">{product.title}</h3>
                                    <div className="text-[18px] text-green-500 font-semibold">{getPriceNew(product.price,product.discountPercentage)}$</div>
                                    <div className="text-[18px] text-red-500 font-semibold line-through	">{product.price}$</div>
                                    <div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-{product.discountPercentage}%</div>

                                </div>
                            </div>
                        </div> 
                        
                    ))
                ):(
                    <Empty/>
                )}
                

                
            </div>
        </>
    );
}

export default Product;
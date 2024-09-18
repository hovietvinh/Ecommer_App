import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { getProductDetaiSluglAction } from "../../../redux/actions/ProductAction"
import BoxHead from "../../components/BoxHead"
import {Card,Descriptions,Tag,Image} from "antd"
function DetailProduct() {
    const {slug} = useParams()
    const dispatch = useDispatch()
    let stateProducts = useSelector(state=>state.ProductReducer)
    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    useEffect(()=>{
        const setProduct =()=>{
            dispatch(getProductDetaiSluglAction(slug))
        }
        setProduct()
        
    },[dispatch,slug])
    // console.log(product);
    return (
        <>  
            <div className="container max-w-[80%] mx-auto my-5">
            <div className="grid grid-cols-1 gap-4">
                    
                    <Card title={<BoxHead text={`${stateProducts.products.title}`}/>}>
                        <Descriptions bordered>
                            <Descriptions.Item label="Tiêu đề"  span={3}>{<h3 className="text-[20px] font-semibold">{stateProducts.products.title}</h3>|| 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Mô tả" span={3}>{stateProducts.products.description || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Giá cũ"  span={3}>{<div className="text-[18px] text-red-500 font-semibold line-through	">{stateProducts.products.price}$</div>|| '0'}</Descriptions.Item>
                            <Descriptions.Item label="Giá Mới"  span={3}>{ <div className="text-[18px] text-green-500 font-semibold">{getPriceNew(stateProducts.products.price,stateProducts.products.discountPercentage)}$</div>|| '0'}</Descriptions.Item>
                            <Descriptions.Item label="% Giảm giá"  span={3}>{<div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-{stateProducts.products.discountPercentage}%</div> || '0%'}</Descriptions.Item>
                            <Descriptions.Item label="Số lượng"  span={3}>{stateProducts.products.stock || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái"  span={3}>{<Tag className="p-1 m-0 " color={stateProducts.products.status === "active" ? "success" : "error"}>{stateProducts.products.status === "active" ? "Hoạt động" : "Dừng hoạt động"}</Tag>|| 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Ảnh"  span={1}>
                                {/* <img
                                src={product.thumbnail || 'https://via.placeholder.com/150'}
                                alt={product.title || 'Thumbnail'}
                                style={{ width: '100px', height: 'auto' }}
                                /> */}
                                <Image
                                    width={200}
                                    src={stateProducts.products.thumbnail || 'https://via.placeholder.com/150'}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>
               
        </>
    );
}

export default DetailProduct;
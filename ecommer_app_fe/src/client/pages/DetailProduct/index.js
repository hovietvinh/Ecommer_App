import {NavLink, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import BoxHead from "../../components/BoxHead"
import {Card,Descriptions,Tag,Image,Typography, Collapse, Row, Col, Form, Input, Button, notification} from "antd"
import { getProductDetaiSluglAction } from "../../../redux/client/actions/ProductAction"
import parse from "html-react-parser";
import { pushProductIntoCartApi } from "../../../utils/apiClient"
const { Paragraph } = Typography;

function DetailProduct() {
    const { Text } = Typography;
    function isObjectNotArray(variable) {
        return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
      }
    const {slug} = useParams()
    const dispatch = useDispatch()
    let stateProducts = useSelector(state=>state.ProductReducerClient)
    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    useEffect(()=>{
        const setProduct =()=>{
            dispatch(getProductDetaiSluglAction(slug))
        }
        setProduct()
        
    },[dispatch,slug])
    // console.log(stateProducts.products);
    const [form] = Form.useForm()
    const hanldeBuy = async(e)=>{
        if(parseInt(e.quantity)>0 && parseInt(e.quantity)<=stateProducts.products.stock ){
            const res=await pushProductIntoCartApi(stateProducts.products._id,e)
            if(res.code==200){
                notification.success({
                    message:res.message
                })
            }
        }
        else{
            notification.error({
                message:"Số lượng không hợp lệ"
            })
        }
        
    }
    return (
        <>  
            {isObjectNotArray(stateProducts.products) && (
                <>
                    <div className="container max-w-[80%] mx-auto my-5">
                        <Row  gutter={[32]} align="middle"  justify="space-between">
                            <Col span={12} className="w-[95%]">
                            <div className="inner-thumb">
                                    <Image
                                        src={stateProducts.products.thumbnail}
                                        className="w-full h-auto"
                                    />
                            </div>
                            </Col>
                            <Col span={12} className="w-[95%] text-black">
                                <h1 className="text-[32px] mb-4 font-semibold text-black">{stateProducts.products.title}</h1>

                                {stateProducts.products.infoCategory &&(
                                    <div className="mb-2 text-black font-normal text-[16px]">
                                        <span className="mr-1">Danh mục:</span>
                                        <NavLink to={`/products/${stateProducts.products.infoCategory.slug}`} className={"text-blue-400 hover:text-blue-900"}>{stateProducts.products.infoCategory.title}</NavLink>
                                    </div>
                                )}
                        
                                {stateProducts.products.price &&(
                                    <div className="mb-2 text-green-400 font-semibold text-[22px]">
                                        {getPriceNew(stateProducts.products.price,stateProducts.products.discountPercentage)}$
                                    </div>
                                )}

                                {stateProducts.products.price &&(
                                    <div className="mb-2 text-red-400 font-normal line-through text-[18px]">
                                        {stateProducts.products.price}$
                                    </div>
                                )}

                                <div className="mb-2 text-black text-[16px]">
                                    Giảm tới <span className="bg-red-500 text-white font-medium inline-block py-1 px-2 rounded-md">{stateProducts.products.descriptions || 0}%</span>
                                </div>

                                <div className="mb-2 text-black text-[16px]">
                                    {stateProducts.products.stock>0?(
                                        <>Còn lại <span className="bg-green-500 text-white font-medium inline-block py-1 px-2 rounded-md">{stateProducts.products.stock || 0} </span> sản phẩm</>

                                    ):(
                                        <span className="text-red-500">Đã hết hàng</span>
                                    )}
                                </div>

                                <Form
                                    form={form}
                                    onFinish={hanldeBuy}
                                >
                                    <Form.Item name="quantity" className="mb-3" initialValue={1}>
                                        <Input
                                        type="number"
                                        className=""
                                        disabled={stateProducts.products.stock>0?false:true}
                                        min={1}
                                        max={stateProducts.products.stock}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button className="w-full text-[16px] py-5 bg-green-500 text-white" type="link" htmlType="submit">
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </Form.Item>
                                </Form>



                            </Col>
                        </Row>
                    </div>

                    <div className="container max-w-[80%] mx-auto my-5">
                        <Row>

                            <Col  span={24}>
                                <BoxHead text="Mô tả sản phẩm"/>

                                <div>
                                    <Paragraph>
                                        {parse(stateProducts.products.description)}
                                    </Paragraph>
                                    
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
                
            )}
            
               
        </>
    );
}

export default DetailProduct;
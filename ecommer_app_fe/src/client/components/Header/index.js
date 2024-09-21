import {  NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Button, Form, Image, Input } from 'antd';
import {SearchOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import Tree from "../Tree";
import { useEffect, useState } from "react";
import { getCartApi } from "../../../utils/apiClient";
function Header({setValue,value}) {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get("keyword")
    useEffect(()=>{
        form.setFieldValue("keyword",keyword)
    },[keyword])

    const [cart,setCart] = useState(null)
    // const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const fetch=async()=>{
            const cartTmp = await getCartApi()
            if(cartTmp.code==200){
                setCart(cartTmp.cart)
            }
            
        }
        fetch()
    },[navigate])
    // console.log(cart);
    

    const handleFinish = (e)=>{
        if(e.keyword){
            navigate(`/search?keyword=${e.keyword}`)
        }
        else{
            navigate("/")
        }
    }
    return (
        <>
            <div className="border-b border-gray-300 py-[20px]">
                <div className="container max-w-[80%] mx-auto">
                    <div className="items-center flex justify-between">
                        
                        <div className="">
                            <h1 className="text-[23px] text-blue-500 font-bold">ECommer-APP</h1>
                        </div>
                        <div className="mx-4 flex-1">

                            <Form className="w-full flex  items-center"
                                form={form}
                                onFinish={handleFinish}
                            >
                                <Form.Item
                                    className="mb-0 w-full"
                                    name="keyword"
                                >
                                    <Input className="w-full" placeholder={`Nhập từ khóa...`}  prefix={<SearchOutlined />}/>
                                </Form.Item>
                                <Form.Item
                                    className="mb-0"

                                >
                                    <Button type="primary" htmlType="submit">Tìm</Button>
                                </Form.Item>

                            </Form>
                        </div>
                        <div className="p-0  m-0 flex-wrap gap-[20px] flex items-center justify-end">
                        <Tree value={value} setValue={setValue}/>
                            <NavLink to="/" className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Trang chủ</NavLink>
                            <NavLink to="/products" onClick={()=>{setValue(null)}} className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Sản phẩm</NavLink>
                            {/* <NavLink className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Danh mục</NavLink> */}
                            
                            <NavLink to="/cart" className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>
                                {cart &&(
                                    <>
                                        <Badge count={cart.total||""} offset={[10, 0]} size="small" className="mr-2">
                                            <div className="font-normal text-blue-500 text-[16px] hover:text-blue-900">
                                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                Giỏ hàng
                                            </div>
                                        </Badge>
                                    </>
                                )}
                                
                                
                                    
                            </NavLink>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        
        
        </>
    );
}

export default Header;
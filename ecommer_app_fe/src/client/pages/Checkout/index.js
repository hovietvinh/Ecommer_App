// import React from 'react';

import { Table ,Image, Card, Form, Input, Button, notification} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutApi, checkoutOrderApi } from "../../../utils/apiClient";
import BoxHead from "../../components/BoxHead";

function Checkout() {
    const [cart,setCart] = useState(null)
    const navigate = useNavigate()

   
    useEffect(()=>{
        const fetch=async()=>{
            const cartTmp = await checkoutApi()
            if(cartTmp.code==200){
                setCart(cartTmp.cart)
            }
            
        }
        fetch()
    },[])
    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    const getSumPrice = (price,quantity)=>{
        return price*quantity
    }
    const getSumCart = (arr)=>{
      
        const ans =arr.reduce((sum,item)=> sum+getSumPrice(getPriceNew(item.price,item.discountPercentage),item.quantity),0)
        return ans
    }


    const columns = [
        
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            render: (img) => <Image className="w-[80px] h-auto" src={img} />,
            className: "w-[150px] h-auto"
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            render:(title)=> <span className="text-blue-400">{title}</span>
            
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (money,record) => <span>{getPriceNew(money,record.discountPercentage)}$</span>
        },
        {
            title:"Số lượng",
            dataIndex:"quantity",
            
        },
        {
            title:"Tổng tiền",
            dataIndex:'price',
            render: (money,record) => <span>{getSumPrice(getPriceNew(money,record.discountPercentage),record.quantity)}$</span>


        },
       
       
    ];
    console.log(cart);
    const handleFinish =async(e)=>{
        if(e.fullName && e.phone && e.address){
            const products = cart.productsObject
            const newData = {
                ...e,
                products
            }
            console.log(newData);
            
            const res = await checkoutOrderApi(newData)

            // console.log(res);
            if(res.code==200){
                navigate(`/checkout/success/${res.orderId}`)
            }
            else{
                notification.error({
                    message:"Đặt hàng không thành công"
                })
            }
        }
        else{
            notification.error({
                message:"Không được để trống"
            })
        }
        
    }
    return (
       <>
            <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text={
                        "Đặt hàng"
                    }/>
                </div>

                <div>
                    {(cart && cart.productsObject && cart.productsObject.length > 0) &&(
                        <Table
                        columns={columns}
                        dataSource={cart.productsObject}
                        pagination={false}
                        bordered
                        />
                        
                        
                        
                    )}
                    
                </div>

                <div className="text-right my-5"> 
                    {(cart && cart.productsObject && cart.productsObject.length > 0) &&(
                            
                                <h1 className="text-[25px] font-medium ">Tổng đơn hàng:{getSumCart(cart.productsObject)}$</h1>
                                     
                    )}
                 </div>

                    
                {(cart && cart.productsObject && cart.productsObject.length > 0) &&(
                    <Card
                    className="w-[50%] container mx-auto"
                    >

                        <Form layout="vertical" autoComplete="on" onFinish={handleFinish}>

                            <Form.Item
                                label="Họ tên"
                                name="fullName"
                                rules={[
                                    {
                                    required: true,
                                    message:"Không được để trống họ tên"
                                    },
                                ]}
                            >

                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                { required: true, message: 'Không được để trống số điện thoại' },
                                { pattern: /^[0-9]{10,11}$/, message: 'Không hợp lệ' }
                                ]}
                            >
                                <Input
                                
                                maxLength={11}
                                type="tel"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    {
                                    required: true,
                                    message:"Không được để trống địa chỉ"
                                    },
                                ]}
                            >

                                <Input/>
                            </Form.Item>

                            <Form.Item>

                                <Button className="bg-green-500 text-white w-full p-3" htmlType="submit">Đặt hàng</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                )}
                 



                    

                


                
            </div>

       </>
    );
}

export default Checkout;
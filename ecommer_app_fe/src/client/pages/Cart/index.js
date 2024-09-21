import { Button, Form, Image, Input, notification, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProductInCart, getCartApi, pushProductIntoCartApi, updateProductInCart } from "../../../utils/apiClient";
import BoxHead from "../../components/BoxHead";

function Cart() {
    const [cart,setCart] = useState(null)
    const [loading,setLoading] = useState(true)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetch=async()=>{
            const cartTmp = await getCartApi()
            if(cartTmp.code==200){
                setCart(cartTmp.cart)
            }
            
        }
        fetch()
    },[dispatch,loading])
    // console.log(cart);

    const getPriceNew = (price,discount)=>{
        return (price - price*discount/100).toFixed(0);
    }
    const getSumPrice = (price,quantity)=>{
        return price*quantity
    }
    const handleDelete = async(id)=>{
        const res = await deleteProductInCart(id)
        if(res.code==200){
            notification.success({
                message:res.message
            })
            setLoading(!loading)
        }
    }


    // const handleQuantityChange = async(quantity, productId) => {
    //     const data = {
    //         quantity:quantity
    //     }
    //     await pushProductIntoCartApi(productId,data)
    //     setLoading(!loading)
    // }
    // console.log(loading);
    const updateCart = async(e,productId,oldQuantity)=>{
        try {
            const newQuantity = parseInt(e.target.value);
            if(newQuantity!=oldQuantity){
                const res = await updateProductInCart(productId,newQuantity)
                if(res.code==200){
                    notification.success({
                        message:res.message
                    })
                    setLoading(!loading)
                }
            }
            
        } catch (error) {
            notification.error({
                message:"Lỗi thao tác"
            })
        }
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
            render: (quantity, record) => (
                <Input
                    type="number"
                    defaultValue={quantity}
                    min={1}
                    // disabled={true}
                    onBlur={(e) => updateCart(e, record._id,quantity)}
               
                    // onChange={(e) => handleQuantityChange(e.target.value, record._id)}
                />
            ),
        },
        {
            title:"Tổng tiền",
            dataIndex:'price',
            render: (money,record) => <span>{getSumPrice(getPriceNew(money,record.discountPercentage),record.quantity)}$</span>


        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
               
                    <Space size="middle">
                        <Button
                            onClick={() => handleDelete(record._id)}
                            size="middle"
                            type="primary"
                            danger
                        >
                            Xóa
                        </Button>

                    
                    </Space>
                </div>
            ),
            className: "w-[260px]"
        },
       
    ];

    const getSumCart = (arr)=>{
      
        const ans =arr.reduce((sum,item)=> sum+getSumPrice(getPriceNew(item.price,item.discountPercentage),item.quantity),0)
        return ans
    }



    return (
        <>
            <div className="container max-w-[80%] mx-auto my-5">

                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text={
                        "Giỏ hàng"
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

                {(cart && cart.productsObject && cart.productsObject.length > 0) &&(
                        <div className="text-right mt-2">
                            <h1 className="text-[25px] font-medium ">Tổng đơn hàng:{getSumCart(cart.productsObject)}$</h1>
                            <Button className="bg-green-600 p-4 font-light text-[20px] text-white">Thanh toán</Button>
                        </div>
                        
                        
                    )}

                

            </div>

        </>
    );
}

export default Cart;
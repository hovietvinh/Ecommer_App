// import React from 'react';

import { Alert, Card, Col, Image, notification, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderSuccessApi } from "../../../utils/apiClient";
import BoxHead from "../../components/BoxHead";

function CheckoutSuccess() {
    
    const {orderId} = useParams()
    const [order,setOrder] = useState()
    const [dataUser,setDataUser] = useState({})
    const [dataProducts,setDataProducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetch= async()=>{
            console.log(orderId);
            const res = await orderSuccessApi(orderId)

            // console.log(res.order);
            if(res.code==200){
                setOrder(res.order)
                setDataUser(res.order.userInfo)
                setDataProducts(res.order.productsInfo)
                // setDataProducts(order)
                
            }
            else{
                console.log(res.code);
                notification.error({
                    message:"Lỗi hiển thị"
                })
                // navigate("/")
            }
        }
        fetch()
    },[navigate,orderId])

    const tableDataUser = [
        { key: '1', label: 'Họ và Tên', value: dataUser.fullName ? dataUser.fullName:"" },
        { key: '2', label: 'Số Điện Thoại', value:  dataUser.phone?dataUser.phone :""},
        { key: '3', label: 'Địa chỉ', value:dataUser.address? dataUser.address:"" },
    ];

    const columnsUser = [
        {
         
          dataIndex: 'label',
          key: 'label',
          width: '50%',
        },
        {
     
          dataIndex: 'value',
          key: 'value',
          render:(value)=>(
            <span className="font-bold ">{value}</span>
          ),
          width: '50%',
        },
      ];

    const columProducts = [
        {
            title:"Ảnh",
            dataIndex:"thumbnail",
            render: (img) => <Image className="w-[80px] h-auto" src={img} />,
            className: "w-[150px] h-auto"
        },
        {
            title:"Tên",
            dataIndex:"title",
        },
        {
            title:"Giá",
            dataIndex:"priceNew",
            render: (money) => <span>{money}$</span>
        },
        {
            title:"Số lượng",
            dataIndex:"quantity",
            
        },{
            title:"Tổng tiền",
            dataIndex:'totalPrice',
            render: (money) => <span>{money}$</span>
        },
    ]

    // console.log(orderId);
    // const []
    return (
        <>
             <div className="container max-w-[80%] mx-auto my-5">
                <div className="grid grid-cols-1 gap-4">
                    <BoxHead text={
                        "Đặt hàng thành công"
                    }/>
                </div>

                <Row className="w-full">
                    <Col span={24}>
                    <Alert
                      
                        message={<span className="text-2xl font-medium">Đặt hàng thành công!</span>}
                      
                        description={
                            <span className="text-[18px]">
                              Chúc mừng bạn đã đặt hàng thành công. Chúng tôi sẽ liên hệ với bạn và sử lý đơn hàng trong thời gian sớm nhất.Xin cảm ơn!
                            </span>
                        }
                        type="success"
                        showIcon
                        className="shadow-lg"
                    />
                    </Col>
                </Row>

                <Row className="w-full mt-8">
                    <Col span={24}>
                        <Card title={<span className="text-[20px]">Thông tin cá nhân</span>}>
                            <Table
                                columns={columnsUser}
                                dataSource={tableDataUser}
                                pagination={false} // Không cần phân trang
                                bordered
                                showHeader={false}
                            />
                            
                        </Card>
                    </Col>
                </Row>

                {dataProducts.length>0&&(
                    <Row className="w-full mt-8">
                        <Col span={24}>
                            <Card title={<span className="text-[20px]">Thông tin đơn hàng</span>}>
                                <Table
                                    columns={columProducts}
                                    dataSource={dataProducts}
                                    pagination={false} // Không cần phân trang
                                    bordered
                                    // showHeader={false}
                                />
                                
                            </Card>
                        </Col>
                    </Row>
                )}

                {order &&(
                    <div className="text-right mt-2">
                    <h1 className="text-[25px] font-medium ">Tổng đơn hàng:{order.totalPrice}$</h1>
                    

                </div>
                )}
                        
                


                
                
            </div>
        </>
    );
}

export default CheckoutSuccess;
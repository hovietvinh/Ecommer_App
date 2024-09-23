import { Button, Card, Form, Input, notification } from "antd";
import { registerUserApi } from "../../../utils/apiClient";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

function Register() {
    const navigate = useNavigate()
    const [userToken,setUserToken] = useState(localStorage.getItem("user_token"))

    useEffect(()=>{
        if(userToken){
            notification.success({
                message:"Hiện đã đăng nhập tài khoản"
            })
            navigate('/')
        }

    },[userToken])

    const handleFinish = async(e)=>{
        const res = await registerUserApi(e)
        if(res.code==200){
            navigate("/user/login")
        }
        console.log(res);
    }
    return (
        
        <>
            <div className="text-center container mx-auto max-w-[30%] shadow-lg my-24">
                <Card
                    title="Đăng ký tài khoản"
                    bordered={false}
                    className=""
                >
                    <Form
                        layout="vertical"
                        onFinish={handleFinish}
                
                    >

                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message:"Không được để trống email"
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message:"Không được để trống mật khẩu"
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item>
                            <Button className="w-full " type="primary" htmlType="submit">Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
        
    );
}

export default Register;
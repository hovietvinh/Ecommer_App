import { Button, Card, Form, Input, notification } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUserApi } from "../../../utils/apiClient"

function Login() {
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
        const res = await loginUserApi(e);
        console.log(res);
        if(res.code==200){
            localStorage.setItem("user_token",res.user_token)
            notification.success({
                message:"Đăng nhập thành công"
            })
            navigate("/")
            
        }
    }
    return (
        <>
            <div className="text-center container mx-auto max-w-[30%] shadow-lg my-24">
                <Card
                    title="Đăng nhập tài khoản"
                    bordered={false}
                    className=""
                >
                    <Form
                        layout="vertical"
                        onFinish={handleFinish}
                
                    >



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

export default Login;
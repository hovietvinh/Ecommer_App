import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkAuthAction, loginAccountAction } from "../../../redux/actions/AuthAction";

function Login() {
    const dispatch = useDispatch()
    const statueAuth = useSelector(state=>state.AuthReducer)
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const handleFinish =async (values) => {
        // console.log(values);
        const res = await dispatch(loginAccountAction(values));
        
        if (res && res.access_token) {
            // console.log(access_token);
            localStorage.setItem("access_token",res.access_token)
            // localStorage.setItem("role",res.role)
            navigate("/admin/dashboard");
        }
        
        form.resetFields()
            
    };
    const access_token = localStorage.getItem("access_token")
    useEffect(()=>{
        const fetch=async()=>{
            if(access_token){
                const auth =await dispatch(checkAuthAction())
                console.log(auth);
                if(auth.code==200){
                    navigate("/admin/dashboard")
                }
            }
        }
        fetch()
        
    },[access_token,dispatch])

    // if(statueAuth)
    // console.log(statueAuth);

    return (
        <div className="container my-5 w-[50%] m-auto">
            <div className="row justify-content-center">
                <div className="col-8">
                    <h1 className="text-center">Đăng nhập</h1>
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={handleFinish}
                        className="mt-4"
                        form={form}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Không được để trống email' },
                                { type: 'email', message: 'Định dạng email không hợp lệ' },
                            ]}
                        >
                            <Input className="form-control" type="email" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Không được để trống mật khẩu' },
                            ]}
                        >
                            <Input.Password className="form-control" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;

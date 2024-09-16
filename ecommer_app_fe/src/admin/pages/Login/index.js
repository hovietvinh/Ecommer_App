import { Form, Input, Button } from "antd";
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { loginAccountAction } from "../../../redux/actions/AuthAction";

function Login() {
    const dispatch = useDispatch()
    const statueAuth = useSelector(state=>state.AuthReducer)
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const handleFinish =async (values) => {
        console.log(values);
        const access_token = await dispatch(loginAccountAction(values));
        
        if (access_token) {
            console.log(access_token);
            localStorage.setItem("access_token",access_token)
            navigate("/admin/dashboard");
        }
        
        form.resetFields()
            
    };
    console.log(statueAuth);

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

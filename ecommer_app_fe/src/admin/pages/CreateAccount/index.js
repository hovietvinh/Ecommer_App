import { Form,Radio,Input, Select,Button } from "antd";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BoxHead from "../../components/BoxHead";
import UploadImg from "../../components/Upload";
import {useDispatch, useSelector} from "react-redux"
import { getRolesAction } from "../../../redux/actions/RoleAction";
import { createAccountAction } from "../../../redux/actions/AccountAction";


function CreateAccount() {
    const {collapsed} = useOutletContext();
    const [form] = Form.useForm()
    const [imageFile, setImageFile] = useState(null); 
    const [data,setData] = useState();
    const handleImageSelect = (file) => {
        setImageFile(file);  // Save the image file when selected
    };
    const dispatch = useDispatch()  
    const stateRoles = useSelector(state=>state.RoleReducer)
    useEffect(()=>{
        dispatch(getRolesAction())
    },[dispatch])

    useEffect(()=>{
        const temData = stateRoles.roles.map((role)=>{
            return {
                value: role._id,
                label: role.title
            }
        })
        setData(temData)
    },[stateRoles.roles])

    const handleFinish =(values)=>{
        let formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key] || '');
        });
        if (imageFile) {
            formData.set('avatar', imageFile);
        }
        
        dispatch(createAccountAction(formData))
        form.resetFields()
        
       
    }

    return (
        <>  
            <div
                className={`transition-all duration-300 ${
                collapsed
                    ? "ml-[100px] w-[calc(100%-100px)]"
                    : "ml-[230px] w-[calc(100%-230px)]"
                } mt-[20px] mr-[20px]`}
            >   
                <BoxHead text="Thêm mới tài khoản"/>

                <Form
                    form={form}
                    layout="vertical"
                    className="mt-4 mr-8"
                    onFinish={handleFinish}
                >
                    
                    <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: 'Không được để trống tên đăng nhập' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Không được để trống email' },
                            { type: 'email', message: 'Định dạng email không hợp lệ' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: 'Không được để trống mật khẩu' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                            pattern: /^[0-9]{10,11}$/,
                            message: 'Số điện thoại phải có 10-11 chữ số',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item  name="avatar">
                        <UploadImg onImageSelect={handleImageSelect} />
                    </Form.Item>


                    <Form.Item
                        name="role_id"
                        rules={[{ required: true, message: 'Vui lòng chọn nhóm quyền' }]} // Thêm quy tắc required
                    >
                        <Select
                            showSearch
                            className="w-full"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={data} // Assumes data is an array of objects like { value: 'roleId', label: 'Role Name' }
                            placeholder="Chọn nhóm quyền"
                        />
                    </Form.Item>


                    <Form.Item name="status" initialValue="active">
                        <Radio.Group value="active">
                            <Radio value="active">Hoạt động</Radio>
                            <Radio value="inactive">Dừng hoạt động</Radio>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">Tạo mới</Button>
                    </Form.Item>
                    




                </Form>


            </div>
        
        </>
    );
}

export default CreateAccount;
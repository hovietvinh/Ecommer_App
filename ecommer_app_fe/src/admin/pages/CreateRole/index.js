import { Form,Input,Button } from "antd";
import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createRoleAction } from "../../../redux/actions/RoleAction";
import BoxHead from "../../components/BoxHead";
import RichTextEditor from '../../components/RichTextEditor';

function CreateRole() {
    const {collapsed} = useOutletContext()
    const [form] = Form.useForm()
    const [editorContent, setEditorContent] = useState('');
    const dispatch = useDispatch()
    const roleState  = useSelector(state=>state.RoleReducer)
    const navigate = useNavigate()
    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
        // console.log('Nội dung đã thay đổi:', content);
      };

    const handleFinish = (values)=>{
        
        if(editorContent){
            values.description = editorContent
        }
        dispatch(createRoleAction(values))
        navigate("/admin/roles")
        setEditorContent("");

        form.resetFields()
    }

    
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text="Thêm mới nhóm quyền"/>

                <Form
                    form={form}
                    layout="vertical"
                    className="mt-5 mr-8"
                    onFinish={handleFinish}
                >
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sản phẩm!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <RichTextEditor handleEditorChange={handleEditorChange} editorContent={editorContent}/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">Tạo mới</Button>
                    </Form.Item>

                </Form>



            </div>

        </>
    );
}

export default CreateRole;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import BoxHead from "../../components/BoxHead";
import {Form,Input,Button } from "antd"
import { useState,useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { editRoleAction, getRoleDetailAction } from "../../../redux/actions/RoleAction";

function EditRole() {
    const {collapsed} = useOutletContext()
    const {id} = useParams()
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const stateRole = useSelector(state=>state.RoleReducer);
    const navigate = useNavigate()
    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };

    useEffect(()=>{
        const axiosApi = ()=>{
            dispatch(getRoleDetailAction(id))
        }
        axiosApi()
    },[dispatch,id])

    useEffect(()=>{
        if (stateRole.roles !== null && typeof stateRole.roles === 'object' && !Array.isArray(stateRole.roles)){
            form.setFieldsValue(stateRole.roles);
            handleEditorChange(stateRole.roles.description)
        }

    },[stateRole.roles,form])

    const handleFinish = async(e)=>{
        e.description = editorContent
        const res = await dispatch(editRoleAction(id,e))
        if(res){
            navigate("/admin/roles")
        }
    }
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text="Chỉnh sửa nhóm quyền"/>


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
                        <Button type="primary" htmlType="submit">Chỉnh sửa</Button>
                    </Form.Item>

                </Form>
            </div>

        </>
    );
}

export default EditRole;

import {  useNavigate, useOutletContext, useParams } from "react-router-dom";
import BoxHead from "../../components/BoxHead";
import {Form,Input,Radio,InputNumber,Button} from  "antd"
import { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import {useDispatch, useSelector} from "react-redux"
import {  createProductCategoryAction,getProductCategoryAction, getProductCategoryDetailAction, updateProductCategoryAction } from "../../../redux/actions/ProductCategoryAction";
import Tree from "../../components/Tree";
function EditProductCategory() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {collapsed} = useOutletContext()
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(()=>{
        const axiosApi = ()=>{
            dispatch(getProductCategoryDetailAction(id))
        }
        axiosApi()
    },[dispatch,id])
    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };
    useEffect(()=>{
        if (stateProductCategory.productsCategory !== null && typeof stateProductCategory.productsCategory === 'object' && !Array.isArray(stateProductCategory.productsCategory)){
            form.setFieldsValue(stateProductCategory.productsCategory);
            handleEditorChange(stateProductCategory.productsCategory.description)
        }

    },[stateProductCategory.productsCategory,form])
    // console.log(stateProductCategory);
    // console.log(stateProductCategory);
    
    const finish = async (values) => {
       
        // console.log(values);
        // console.log(formData);
        
        
        dispatch(updateProductCategoryAction(id,values))
            .then(()=>{
                dispatch(getProductCategoryAction())
            });
        navigate('/admin/products-category');
        // navigate("/admin/products-category")
      
      };

    return (
       <>
            <div 
                    className={`transition-all duration-300 ${
                    collapsed
                        ? "ml-[100px] w-[calc(100%-100px)]"
                        : "ml-[230px] w-[calc(100%-230px)]"
                    } mt-[20px] mr-[20px]`}
            >
                <BoxHead text={"Chỉnh sửa danh mục sản phẩm"}/>
                <Form
                form={form}
                layout="vertical"
                className="mt-5 mr-8"
                onFinish={finish}
                >
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Danh mục cha" name="parent_id">
                     
                        <Tree value={value} onChange={onChange} treeData={stateProductCategory.tree} />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <RichTextEditor handleEditorChange={handleEditorChange} editorContent={editorContent}/>
                    </Form.Item>

                    <Form.Item label="Vị trí" name="position">
                        <InputNumber min={1} placeholder="Tự động tăng" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="status">
                        <Radio.Group value="active">
                        <Radio value="active">Hoạt động</Radio>
                        <Radio value="inactive">Dừng hoạt động</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Chỉnh sửa</Button>
                    </Form.Item>

                </Form>
            </div>
       </>
    );
}

export default EditProductCategory;
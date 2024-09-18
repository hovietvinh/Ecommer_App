import {  useNavigate, useOutletContext } from "react-router-dom";
import BoxHead from "../../components/BoxHead";
import {Form,Input,Radio,InputNumber,Button} from  "antd"
import { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import {useDispatch, useSelector} from "react-redux"
import {  createProductCategoryAction,getProductCategoryAction } from "../../../redux/actions/ProductCategoryAction";
import Tree from "../../components/Tree";
function CreateProductCategory() {
    const { collapsed } = useOutletContext();
    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState('');
    const dispatch = useDispatch()
    const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)
    const navigate = useNavigate()
    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };

    useEffect(()=>{
        const getProductCategory = ()=>{
            dispatch(getProductCategoryAction())
        }
        getProductCategory()
    },[dispatch])    


    // console.log(stateProductCategory.productsCategory);
    // formatData(stateProductCategory.productsCategory)
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);
    };
    const finish = async (values) => {
       
              
        // console.log(formData);
        
        
        values.description = editorContent
        // console.log(values);
        dispatch(createProductCategoryAction(values))
        // navigate("/admin/products-category")
       
        setEditorContent("");
        form.resetFields();
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
                <BoxHead text={"Thêm danh mục sản phẩm"}/>
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
                        <Button type="primary" htmlType="submit">Tạo mới</Button>
                    </Form.Item>

                </Form>

                
                
            </div>
        </>
    );
}

export default CreateProductCategory;
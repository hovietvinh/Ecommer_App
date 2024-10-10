import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Radio, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { createProductAction } from '../../../redux/actions/ProductAction';
import BoxHead from '../../components/BoxHead';
import UploadImg from '../../components/Upload';
import RichTextEditor from '../../components/RichTextEditor';
import { getProductCategoryAction } from '../../../redux/actions/ProductCategoryAction';
import Tree from '../../components/Tree';
import SpinScreen from '../../components/SpinScreen';

function CreateProduct() {
  
  const [show,setShow] = useState(false)
  const { collapsed } = useOutletContext();
  const [form] = Form.useForm();
  const [inputPrice, setInputPrice] = useState(1);
  const [inputDiscount, setInputDiscount] = useState(0);
  const [inputStock, setInputStock] = useState(1);
  const [imageFile, setImageFile] = useState(null);  // State for image file
  const dispatch = useDispatch();
  const [editorContent, setEditorContent] = useState('');
  const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)

  const getProductCategory = ()=>{
    dispatch(getProductCategoryAction())
  }
  useEffect(()=>{
    
    getProductCategory()
    setShow(true)
  },[dispatch])  
  const [value, setValue] = useState();
  const onChange = (newValue) => {
      setValue(newValue);
  };
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
    // console.log('Nội dung đã thay đổi:', content);
  };

  const handleImageSelect = (file) => {
    setImageFile(file);  // Save the image file when selected
  };

  const finish = async (values) => {
    setShow(false);
    let formData = new FormData();
    
    // Append all form fields
    Object.keys(values).forEach(key => {
      formData.append(key, values[key] || '');
    });
    
    // Append the image file if it exists
    if (imageFile) {
      formData.append('thumbnail', imageFile);  // 'thumbnail' must match backend field name
    }

    if(editorContent){
      formData.set("description",editorContent)
    }
  
  
    dispatch(createProductAction(formData));
  
    
    setEditorContent("");
    form.resetFields();
    setShow(true)
  };
  

  return (
    <>
    {show ?(
      <>
        <div className={`transition-all duration-300 ${collapsed ? 'ml-[100px] w-[calc(100%-100px)]' : 'ml-[230px] w-[calc(100%-230px)]'} mt-[20px] mr-[20px]"`}>
        <BoxHead text={"Thêm mới sản phẩm"} />

        <Form
          form={form}
          layout="vertical"
          className="mt-5 mr-8"
          onFinish={finish}
          initialValues={{ price: 1, discountPercentage: 0, stock: 1, status: 'active' ,featured:"0"}}
        >
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Danh mục" name="product_category_id">
                     
            <Tree value={value} onChange={onChange} treeData={stateProductCategory.tree} />
          </Form.Item>

          <Form.Item name="featured">
            <Radio.Group value="0">
              <Radio value="1">Nổi bạt</Radio>
              <Radio value="0">Không</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <RichTextEditor handleEditorChange={handleEditorChange} editorContent={editorContent}/>
          </Form.Item>

          <Form.Item label="Giá" name="price">
            <InputNumber min={0} value={inputPrice} onChange={setInputPrice} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="% Giảm giá" name="discountPercentage">
            <InputNumber min={0} max={100} value={inputDiscount} onChange={setInputDiscount} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Số lượng" name="stock">
            <InputNumber min={1} value={inputStock} onChange={setInputStock} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Vị trí" name="position">
            <InputNumber min={1} placeholder="Tự động tăng" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item className="" name="thumbnail">
            <UploadImg onImageSelect={handleImageSelect} />
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
    ):(
      <>
        <SpinScreen />
      </>
    )}
      
    </>
  );
}

export default CreateProduct;

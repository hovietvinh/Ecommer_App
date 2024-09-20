import React, { useState, useEffect } from 'react';
import BoxHead from "../../components/BoxHead";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailAction, getProductsAdminAction, updateProductAction } from "../../../redux/actions/ProductAction";
import { Form, Radio, Input, InputNumber, Button, message } from "antd";
import UploadImg from "../../components/Upload/index"; // Adjust the import path based on your folder structure
import RichTextEditor from '../../components/RichTextEditor';
import { getProductCategoryAction } from '../../../redux/actions/ProductCategoryAction';
import Tree from '../../components/Tree';

function EditProduct() {
  const { collapsed } = useOutletContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateProducts = useSelector((state) => state.ProductReducer);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)

  // console.log(product);

  
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
    // console.log(content);
    // console.log('Nội dung đã thay đổi:', content);
  };

  useEffect(() => {
    dispatch(getProductDetailAction(id));
    dispatch(getProductCategoryAction())

  }, [dispatch, id]);

  const [value, setValue] = useState();
  const onChange = (newValue) => {
      setValue(newValue);
  };

  useEffect(() => {
    // console.log(123);
    if (stateProducts.products && typeof stateProducts.products === 'object' && !Array.isArray(stateProducts.products)) {
      form.setFieldsValue(stateProducts.products);
      // console.log(product);
      // console.log(form.getFieldValue());
      setEditorContent(stateProducts.products.description)
      setImageFile(null); // Reset image file to allow image upload if necessary
    }
  }, [stateProducts.products, form]);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  

  // console.log(product);
  const finish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key] || '');
    });
    if (imageFile) {
      formData.append('thumbnail', imageFile);
    }
    if(editorContent){
      formData.set("description",editorContent)
    }



    dispatch(updateProductAction(id, formData))
      .then(()=>{
        dispatch(getProductsAdminAction())
      });
    navigate('/admin/products');
    
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
        <BoxHead text={"Chỉnh sửa sản phẩm"} />

        <Form
          form={form}
          layout="vertical"
          className="mt-5 mr-8"
          onFinish={finish}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Danh mục" name="product_category_id">
                     
            <Tree value={value} onChange={onChange} treeData={stateProductCategory.tree} />
          </Form.Item>

          <Form.Item name="featured">
            <Radio.Group >
              <Radio value="1">Nổi bạt</Radio>
              <Radio value="0">Không</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <RichTextEditor editorContent={editorContent} handleEditorChange={handleEditorChange} />
          </Form.Item>

          <Form.Item label="Giá" name="price">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="% Giảm giá" name="discountPercentage">
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Số lượng" name="stock">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Vị trí" name="position">
            <InputNumber min={1} placeholder="Tự động tăng" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            <UploadImg onImageSelect={handleImageSelect} defaultImage={stateProducts.products.thumbnail} />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status">
            <Radio.Group>
              <Radio value={"active"}>Hoạt động</Radio>
              <Radio value={"inactive"}>Dừng hoạt động</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default EditProduct;

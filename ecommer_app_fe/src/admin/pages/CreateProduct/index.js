import { Form, InputNumber, notification, Tag, Input, Button, Radio } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { createProductAction } from "../../../redux/actions/ProductAction";
import BoxHead from "../../components/BoxHead";
import UploadImg from "../../components/Upload";

function CreateProduct() {
  const { collapsed } = useOutletContext();
  const [form] = Form.useForm();
  const [inputPrice, setInputPrice] = useState(0);
  const [inputDiscount, setInputDiscount] = useState(0);
  const [inputStock, setInputStock] = useState(1);
  const [imageFile, setImageFile] = useState(null);  // State for image file
  const dispatch = useDispatch();

  const handleImageSelect = (file) => {
    setImageFile(file);  // Save the image file when selected
  };

  const finish = async (values) => {
    
    // const productData = {
    //   title: values.title,
    //   description: values.description || null,
    //   price: values.price || 0,
    //   discountPercentage: values.discountPercentage || 0,
    //   stock: values.stock || 1,
    //   position: values.position || null,
    //   status: values.status || "active",
    //   thumbnail: imageFile || null,  // Gửi link ảnh thay vì file
    // };
  
    // Create form data to send both image and other form data
    // const formData = new FormData();
    // formData.append('title', values.title);
    // formData.append('description', values.description);
    // formData.append('price', values.price);
    // formData.append('discountPercentage', values.discountPercentage);
    // formData.append('stock', values.stock);
    // formData.append('position', values.position || null);
    // formData.append('status', values.status);
    // formData.append('thumbnail', imageFile);  // Append the image file

    dispatch(createProductAction(productData));  // Dispatch action with form data
    form.resetFields();
  };

  return (
    <>
      <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]"`}>
        <BoxHead text={"Thêm mới sản phẩm"} />

        <Form
          form={form}
          layout="vertical"
          className="mt-5 mr-8"
          onFinish={finish}
          initialValues={{ price: 0, discountPercentage: 0, stock: 1, status: "active" }}
        >
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề sản phẩm!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} />
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

          {/* <Form.Item className="" name="thumbnail">
            <UploadImg onImageSelect={handleImageSelect} /> 
          </Form.Item> */}

          <Form.Item label="Trạng thái" name="status">
            <Radio.Group value={"active"}>
              <Radio value={"active"}>Hoạt động</Radio>
              <Radio value={"inactive"}>Dừng hoạt động</Radio>
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

export default CreateProduct;

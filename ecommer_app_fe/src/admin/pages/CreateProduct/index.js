import { Form, InputNumber, notification, Tag, Input, Button, Radio } from "antd";
import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useOutletContext } from "react-router-dom";
import { createProductAction } from "../../../redux/actions/ProductAction";
import BoxHead from "../../components/BoxHead";

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);

function CreateProduct() {
  const { collapsed } = useOutletContext();
  const [form] = Form.useForm();
  const [inputPrice, setInputPrice] = useState(0); // Initialize with 0
  const [inputDiscount, setInputDiscount] = useState(0); // Initialize with 0
  const [inputStock, setInputStock] = useState(1); // Initialize with 1
  const dispatch = useDispatch();
  const products = useSelector(state => state.ProductReducer);


  // Ensure default values are set correctly
  const [status, setStatus] = useState("active");

  const handleBlurDis = () => {
    const value = form.getFieldValue('discountPercentage');
    if (value < 0 || value > 100) {
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Giá phải trong khoảng từ 0 đến 100.",
      });
      form.setFieldsValue({ discountPercentage: 0 }); // Reset to 0 if invalid
      setInputDiscount(0); // Ensure state is also updated
    }
  };

  const handleChangeDis = (value) => {
    if (value < 0 || value > 100) {
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Giá phải trong khoảng từ 0 đến 100.",
      });
      form.setFieldsValue({ discountPercentage: 0 }); // Reset to 0 if invalid
      setInputDiscount(0); // Ensure state is also updated
    } else {
      setInputDiscount(value); // Update value if valid
    }
  };

  const handleBlur = () => {
    const value = form.getFieldValue('price');
    if (value < 0 ) {
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Giá không được âm.",
      });
      form.setFieldsValue({ price: 0 }); // Reset to 0 if invalid
      setInputPrice(0); // Ensure state is also updated
    }
  };

  const handleChange = (value) => {
    if (value < 0) {
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Giá không được âm.",
      });
      form.setFieldsValue({ price: 0 }); // Reset to 0 if invalid
      setInputPrice(0); // Ensure state is also updated
    } else {
      setInputPrice(value); // Update value if valid
    }
  };

  const handleBlurStock = () => {
    const value = form.getFieldValue('stock');
    if (value < 1) { // Correct the field name to 'stock'
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Số lượng phải lớn hơn hoặc bằng 1.",
      });
      form.setFieldsValue({ stock: 1 }); // Reset to 1 if invalid
      setInputStock(1); // Ensure state is also updated
    }
  };

  const handleChangeStock = (value) => {
    if (value < 1) {
      notification.error({
        message: "Giá trị không hợp lệ",
        description: "Số lượng phải lớn hơn hoặc bằng 1.",
      });
      form.setFieldsValue({ stock: 1 }); // Reset to 1 if invalid
      setInputStock(1); // Ensure state is also updated
    } else {
      setInputStock(value); // Update value if valid
    }
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value); // Update local state
  };

  const finish = (values) => {
    dispatch(createProductAction(values))
    form.resetFields()
  };

  return (
    <>
      <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
        <BoxHead text={"Thêm mới sản phẩm"} />

        <Form
          form={form}
          layout="vertical"
          requiredMark={customizeRequiredMark}
          className="mt-5 mr-8"
          onFinish={finish}
          initialValues={{ 
            price: 0, 
            discountPercentage: 0, // Set default value for discount here
            stock: 1, // Set default value for stock here
            status: "active" // Set default value for status here
          }}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề sản phẩm!" }]}
            tooltip="Yêu cầu sản phẩm phải có tiêu đề"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
          >
            <InputNumber
              min={0} // Set the minimum value to 0
              value={inputPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ width: '100%' }} // Ensure the input takes full width
            />
          </Form.Item>

          <Form.Item
            label="% Giảm giá"
            name="discountPercentage"
          >
            <InputNumber
              min={0} // Set the minimum value to 0
              max={100} // Set the maximum value to 100
              value={inputDiscount}
              onChange={handleChangeDis}
              onBlur={handleBlurDis}
              style={{ width: '100%' }} // Ensure the input takes full width
            />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="stock"
          >
            <InputNumber
              min={1} // Set the minimum value to 1
              value={inputStock}
              onChange={handleChangeStock}
              onBlur={handleBlurStock}
              style={{ width: '100%' }} // Ensure the input takes full width
            />
          </Form.Item>

          <Form.Item
            label="Vị trí"
            name="position"
          >
            <InputNumber
              min={1} // Set the minimum value to 1
              placeholder="Tự động tăng"
              style={{ width: '100%' }} // Ensure the input takes full width
            />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm!" }]} 
            tooltip="Yêu cầu chọn trạng thái sản phẩm!"
            // Ensure this name matches the form field
          >
            <Radio.Group onChange={onChangeStatus} value={status}>
              <Radio value={"active"}>Hoạt động</Radio>
              <Radio value={"inactive"}>Dừng hoạt động</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary"  htmlType="submit">Tạo mới</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default CreateProduct;

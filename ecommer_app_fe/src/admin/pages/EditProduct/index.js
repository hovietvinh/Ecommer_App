import BoxHead from "../../components/BoxHead";
import { useOutletContext, useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetailAction,updateProductAction } from "../../../redux/actions/ProductAction";
import { Form, Radio, Input, InputNumber, Button } from "antd";

function EditProduct() {
  const { collapsed } = useOutletContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ProductReducer); // Lấy productDetail từ Redux
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy chi tiết sản phẩm khi component được mount
    dispatch(getProductDetailAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    // console.log(product);
    // Khi product thay đổi, cập nhật giá trị form
    if (product !== null && typeof product === 'object' && !Array.isArray(product)) {
    console.log(product);
        
      form.setFieldsValue(product); // Đặt giá trị mặc định của form bằng dữ liệu product
    }
  }, [product, form]);

  const finish = async (values) => {
    // Xử lý khi submit form
    dispatch(updateProductAction(id,values))
    console.log(values);

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

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Giá" name="price">
            <InputNumber min={0} style={{ width: "100%" }} />
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

import {  Button, Form,Input } from "antd";

function Search(props) {
    const {form,handleSearch} = props
    return (
        <>
            <Form
                form={form}
                layout="inline"
                onFinish={handleSearch}
            >
                <Form.Item name="keyword">
                    <Input placeholder="Nhập từ khóa" />
                </Form.Item>

                <Form.Item>
                    <Button  type="primary" htmlType="submit">Tìm kiếm</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Search;
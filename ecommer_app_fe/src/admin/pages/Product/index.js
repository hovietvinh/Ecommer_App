import BoxHead from "../../components/BoxHead";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getProductsAdminAction } from "../../../redux/actions/ProductAction";
import { Empty,Table,Tag,Space,Card, Button, Form,Input } from "antd";
import { NavLink,useLocation, useSearchParams,useOutletContext } from "react-router-dom";

function Product() {
    const location = useLocation();
    const { collapsed } = useOutletContext();

    const [searchParams,setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries())
    
    const currentStatus = searchParams.get('status');
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            keyword: searchParams.get('keyword') || ''
        });
        return () => {
            form.resetFields();
        };
    }, [searchParams, form]);

    const columns = [
       
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'thumbnail',
          render:(img)=> <img className="w-[80px] h-auto " src={img} />,
          className:"w-[200px] h-auto"
        },
        
        {
          title: 'Giá',
          dataIndex: 'price',
          render:(money)=> <span>{money}$</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render:(status)=> <Tag className="p-1" color={status=="active"?"success":"error"}>{status=="active"?"Hoạt động":"Dừng hoạt động"}</Tag>
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render:()=> (
                <Space size="middle">
                    <NavLink className="bg-yellow-400 p-2 text-black rounded-md ">Sửa</NavLink>
                    <NavLink className="text-white bg-red-600 p-2 rounded-md">Xóa</NavLink>
                   
                </Space>
            ),
            className:"w-1/6"
        },
      ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const dispatch = useDispatch();
    const products = useSelector(state=> state.ProductReducer)
    useEffect(()=>{
        const fetchApi = ()=>{
            
            dispatch(getProductsAdminAction(params))
            
             
        }
        fetchApi()
    },[dispatch,JSON.stringify(params)])
    // console.log(params);
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections:[
            Table.SELECTION_ALL,
            Table.SELECTION_NONE
        ]
    }
    const handleStatusClick = (newStatus) => {
        const newParams = new URLSearchParams(searchParams);
        if(newStatus){
            newParams.set('status',newStatus);   
        }
        else{
            newParams.delete('status');
        }
        setSearchParams(newParams);
        
    };
    const handleSearch = (e)=>{
        const {keyword} =e 
        const newParams = new URLSearchParams(searchParams);
        if(keyword){
            newParams.set('keyword',keyword);   
        }
        else{
            newParams.delete('keyword');
        }
        setSearchParams(newParams);
        // form.resetFields()
    }


    return (  
        <>
            <div  className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text={"Danh sách sản phẩm"}/>
                <Card 
                    title="Bộ lọc và tìm kím" 
                   
                    headStyle={{
                        backgroundColor: '#edf2f7', 
                        color: '#2d3748', 
                        padding: '16px',
                        borderRadius: '0.375rem 0.375rem 0 0',
                        width: '100%',
                        boxSizing: 'border-box', 
                        fontWeight: '300'
                    }}
                    bordered={true} 
                    size="middle" className="mr-8 mb-6 rounded-md"
                    
                   
                >
                    <div className="flex items-center justify-between">
                        <Space size="small">
                            <Button
                                type={!currentStatus ? 'primary' : 'default'}
                                onClick={() => handleStatusClick('')}
                            >
                                Tất cả
                            </Button>
                            <Button
                                type={currentStatus === 'active' ? 'primary' : 'default'}
                                onClick={() => handleStatusClick('active')}
                            >
                                Hoạt động
                            </Button>
                            <Button
                                type={currentStatus === 'inactive' ? 'primary' : 'default'}
                                onClick={() => handleStatusClick('inactive')}
                            >
                                Dừng hoạt động
                            </Button>
                        
                        </Space>

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
                        
                    </div>
                    
                    
                </Card>

                {products.length>0?(
                    <Table  size="middle" className="mr-8" rowSelection={rowSelection} columns={columns} dataSource={products} bordered/>
                )
                :(
                    <Empty/>
                )}



            </div>
        </>
    );
}

export default Product;
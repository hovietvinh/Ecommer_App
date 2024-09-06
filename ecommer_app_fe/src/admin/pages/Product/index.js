import BoxHead from "../../components/BoxHead";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteProductAction, getProductsAdminAction, updateStatusProductAction } from "../../../redux/actions/ProductAction";
import { Empty,Table,Tag,Space,Card, Button, Form,Input, Select } from "antd";
import { NavLink,useLocation, useSearchParams,useOutletContext } from "react-router-dom";
import FilterStatus from "../../components/FilterStatus";
import Search from "../../components/Search";
import ChangeMulti from "../../components/ChangeMulti";

function Product() {
    const location = useLocation();
    const { collapsed } = useOutletContext();

    const [searchParams,setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries())
    
    const currentStatus = searchParams.get('status');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const products = useSelector(state=> state.ProductReducer)
    useEffect(()=>{
        const fetchApi = ()=>{
            
            dispatch(getProductsAdminAction(params))
            
             
        }
        fetchApi()
    },[dispatch,JSON.stringify(params)])

    useEffect(() => {
        form.setFieldsValue({
            keyword: searchParams.get('keyword') || ''
        });
        return () => {
            form.resetFields();
        };
    }, [searchParams, form]);

    const handleChangeStatus = (status,id)=>{
        let newStatus;
        if(status=="active"){
            newStatus="inactive"
        }else{
            newStatus="active"
        }
        dispatch(updateStatusProductAction(newStatus,id))

    }
    const handleDelete =(id)=>{
        dispatch(deleteProductAction(id))
    }

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
            render:(status,record)=> <Button onClick={()=>{handleChangeStatus(record.status,record._id)}} className="p-0 m-0"><Tag className="p-1 m-0 w-full" color={status=="active"?"success":"error"}>{status=="active"?"Hoạt động":"Dừng hoạt động"}</Tag></Button>
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render:(_,record)=> (
                <Space size="middle">
                    <NavLink className="bg-yellow-400 p-2 px-3 text-black rounded-md ">Sửa</NavLink>
                    <Button
                        onClick={() => handleDelete(record._id)}
                        size="middle"
                        type="primary" 
                        danger
                    >
                        Xóa
                    </Button>

                </Space>
            ),
            className:"w-1/6"
        },
      ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL, Table.SELECTION_NONE]
    };
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
                        <FilterStatus currentStatus={currentStatus} handleStatusClick={handleStatusClick}/>

                        <Search form={form} handleSearch={handleSearch}/>
                        
                    </div>
                    
                    
                </Card>

                {products.length>0?(
                    <Card
                        title="Danh sách" 
                        bordered={false}
                        size="middle" className="mr-8 mb-6"
                        headStyle={{
                            backgroundColor: '#edf2f7', 
                            color: '#2d3748', 
                            padding: '16px',
                            borderRadius: '0.375rem 0.375rem 0 0',
                            width: '100%',
                            boxSizing: 'border-box', 
                            fontWeight: '300'
                        }}
                    >
                        
                        <ChangeMulti selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>
                        <Table rowKey={(record) => record._id} size="middle" className="mr-8 mt-5" rowSelection={rowSelection} columns={columns} dataSource={products} bordered/>
                    </Card>
                )
                :(
                    <Empty/>
                )}



            </div>
        </>
    );
}

export default Product;
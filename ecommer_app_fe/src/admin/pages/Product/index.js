import BoxHead from "../../components/BoxHead";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../redux/actions/ProductAction";
import { Empty,Table,Tag,Space } from "antd";
import { NavLink } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

function Product() {
    const { collapsed } = useOutletContext();

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
             dispatch(getProductsAction())
             
        }
        fetchApi()
    },[dispatch])
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections:[
            Table.SELECTION_ALL,
            Table.SELECTION_NONE
        ]
    }

    return (
        
        <>
            <div  className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text={"Danh sách sản phẩm"}/>
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
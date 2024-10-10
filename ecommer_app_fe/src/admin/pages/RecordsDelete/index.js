import { useEffect ,useState} from "react";
import BoxHead from "../../components/BoxHead/index"
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext,NavLink } from "react-router-dom";
import { deletedPermanentlyProductAction, getProductDeletedAction, getProductsAdminAction, returnDeletedAction } from "../../../redux/actions/ProductAction";
import { deletedPermanentlyProductCategoryAction, getProductCategoryDeletedAction, returnDeletedProductCategoryAction } from "../../../redux/actions/ProductCategoryAction";
import { Button, Card, Empty, Table,Tag } from "antd";

function RecordsDelete() {
    const {collapsed} = useOutletContext()
    const dispatch = useDispatch()
    const stateProducts = useSelector(state=>state.ProductReducer)
    const stateProductsCategory = useSelector(state=>state.ProductCategoryReducer)

    
    
    useEffect(()=>{
        const fetchApi = ()=>{
            // dispatch(getProductsAdminAction())
            // dispatch(getProductsAdminAction())
            dispatch(getProductDeletedAction())
            dispatch(getProductCategoryDeletedAction())
          
        }
        fetchApi()
    },[dispatch,stateProducts,stateProductsCategory])
    // console.log(stateProductsCategory);

    const setReturn =(id)=>{
        dispatch(returnDeletedAction(id))
            .then(()=>{
                dispatch(getProductDeletedAction())
            })
    }
    const setReturnProductCategory= (id)=>{
        // dispatch(returnDeleteProductCategorydAction(id))
        dispatch(returnDeletedProductCategoryAction(id))
    }
    const deletedAlways = (id)=>{
        dispatch(deletedPermanentlyProductAction(id))
            .then(()=>{
                dispatch(getProductDeletedAction())
            })

    }
    const deletedAlwaysProductCategory = (id)=>{
        dispatch(deletedPermanentlyProductCategoryAction(id))
            
    }
    // console.log(stateProductsCategory);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL, Table.SELECTION_NONE]
    };

    const [selectedRowKeysProductCategory, setSelectedRowKeysProductCategory] = useState([]);
    const onSelectChangeProductCategory = (newSelectedRowKeys) => {
        setSelectedRowKeysProductCategory(newSelectedRowKeys);
    };
    const rowSelectionProductCategory = {
        selectedRowKeysProductCategory,
        onChange: onSelectChangeProductCategory,
        selections: [Table.SELECTION_ALL, Table.SELECTION_NONE]
    };
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            render: (img) => <img className="w-[80px] h-auto" src={img} />,
            className: "w-[150px] h-auto"
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (money) => <span>{money}$</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, record) => (
                <Tag className="p-1 m-0 w-full" color={status === "active" ? "success" : "error"}>
                        {status === "active" ? "Hoạt động" : "Dừng hoạt động"}
                </Tag>
            ),
            className: "w-1/12"

        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
                    <Button onClick={()=>{setReturn(record._id)}}  className="bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-2 rounded-md mr-4">Khôi phục</Button>
                    <Button onClick={()=>{deletedAlways(record._id)}}  className="bg-red-500 hover:bg-red-600 text-white font-normal py-2 px-2 rounded-md">Xóa vĩnh viễn</Button>

                </div>
            ),
            className: "w-[260px]"
        },
    ];    
    console.log(stateProductsCategory);
    const columnsProductCategory = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
        },
        {
            title: 'Danh mục cha',
            dataIndex: 'infoParent',
            render: (_,record) => <p>{record.title}</p>,
            
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, record) => (
                <Tag className="p-1 m-0 w-full" color={status === "active" ? "success" : "error"}>
                        {status === "active" ? "Hoạt động" : "Dừng hoạt động"}
                </Tag>
            ),
            // className: "w-1/12"

        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
                    <Button onClick={()=>{setReturnProductCategory(record._id)}} className="bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-2 rounded-md mr-4">Khôi phục</Button>
                    <Button onClick={()=>{deletedAlwaysProductCategory(record._id)}}  className="bg-red-500 hover:bg-red-600 text-white font-normal py-2 px-2 rounded-md">Xóa vĩnh viễn</Button>

                </div>
            ),
            // className: "w-[260px]"
        },
    ];   
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text="Thùng rác"/>

                {stateProducts.deleted && stateProducts.deleted.length > 0 && (
                    <Card
                        title="Danh sách"
                        bordered={false}
                        size="middle" className="mr-8 mb-6 mt-4"
                        headStyle={{
                            color: '#2d3748',
                            padding: '16px',
                            borderRadius: '0.375rem 0.375rem 0 0',
                            width: '100%',
                            boxSizing: 'border-box',
                            fontWeight: '300'
                        }}
                    >
                        

                        <Table
                            rowKey={(record) => record._id}
                            size="middle"
                            className="mr-8 mt-5"
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={stateProducts.deleted}
                            bordered
                        />
                    </Card>
                )}

                {stateProductsCategory.deleted && stateProductsCategory.deleted.length>0 &&(
                    <Card
                    title="Danh sách"
                    bordered={false}
                    size="middle" className="mr-8 mb-6 mt-4"
                    headStyle={{
                        color: '#2d3748',
                        padding: '16px',
                        borderRadius: '0.375rem 0.375rem 0 0',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontWeight: '300'
                    }}
                    >
                        <Table
                            rowKey={(record) => record._id}
                            size="middle"
                            className="mr-8 mt-5"
                            rowSelection={rowSelectionProductCategory}
                            columns={columnsProductCategory}
                            dataSource={stateProductsCategory.deleted}
                            bordered
                        />

                    </Card>

                )}



                
            </div>

        </>
    );
}

export default RecordsDelete;
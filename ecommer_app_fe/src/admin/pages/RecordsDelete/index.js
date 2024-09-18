import { useEffect ,useState} from "react";
import BoxHead from "../../components/BoxHead/index"
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext,NavLink } from "react-router-dom";
import { deletedPermanentlyProductAction, getProductDeletedAction, getProductsAdminAction, returnDeletedAction } from "../../../redux/actions/ProductAction";
import { getProductCategoryDeletedAction } from "../../../redux/actions/ProductCategoryAction";
import { Button, Card, Empty, Table,Tag } from "antd";

function RecordsDelete() {
    const {collapsed} = useOutletContext()
    const dispatch = useDispatch()
    const stateProducts = useSelector(state=>state.ProductReducer)
    console.log(stateProducts.deleted);
    
    useEffect(()=>{
        const fetchApi = ()=>{
            dispatch(getProductsAdminAction())
            // dispatch(getProductsAdminAction())
            dispatch(getProductDeletedAction())
          
        }
        fetchApi()
    },[])

    const setReturn =(id)=>{
        dispatch(returnDeletedAction(id))
            .then(()=>{
                dispatch(getProductDeletedAction())
            })
    }
    const deletedAlways = (id)=>{
        dispatch(deletedPermanentlyProductAction(id))
            .then(()=>{
                dispatch(getProductDeletedAction())
            })

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
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text="Thùng rác"/>

                {stateProducts.deleted && stateProducts.deleted.length > 0 ? (
                    <Card
                        title="Danh sách"
                        bordered={false}
                        size="middle" className="mr-8 mb-6 mt-4"
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
                ) : (
                    <Empty />
                    
                )}

                
            </div>

        </>
    );
}

export default RecordsDelete;
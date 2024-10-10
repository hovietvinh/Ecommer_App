import BoxHead from "../../components/BoxHead";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, getProductsAdminAction, updateMultiAction, updateStatusProductAction } from "../../../redux/actions/ProductAction";
import { Empty, Table, Tag, Space, Card, Button, Form, Input, notification } from "antd";
import { NavLink, useLocation, useSearchParams, useOutletContext } from "react-router-dom";
import FilterStatus from "../../components/FilterStatus";
import Search from "../../components/Search";
import ChangeMulti from "../../components/ChangeMulti";
import moment from "moment"

function Product() {
    const location = useLocation();
    const { collapsed } = useOutletContext();

    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    const currentStatus = searchParams.get('status');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const stateProduct = useSelector(state => state.ProductReducer);

    useEffect(() => {
        dispatch(getProductsAdminAction(params));
    }, [dispatch, JSON.stringify(params)]);

    useEffect(() => {
        form.setFieldsValue({
            keyword: searchParams.get('keyword') || ''
        });
        return () => {
            form.resetFields();
        };
    }, [searchParams, form]);

    const handleChangeStatus = (status, id) => {
        let newStatus = status === "active" ? "inactive" : "active";
        dispatch(updateStatusProductAction(newStatus, id));
    };

    const handleDelete = (id) => {
        dispatch(deleteProductAction(id))
            .then(()=>{
                dispatch(getProductsAdminAction())
            })
    };

    const [inputValues, setInputValues] = useState({}); // State to manage input values
    const [defaultValues, setDefaultValues] = useState({}); // State to manage default values

    const handleBlur = (id, e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 1) {
            notification.error({
                message: "Giá trị không hợp lệ",
                description: "Giá trị phải lớn hơn hoặc bằng 1"
            });
            setInputValues(prevValues => ({
                ...prevValues,
                [id]: defaultValues[id] // Reset to default value
            }));
        }
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL, Table.SELECTION_NONE]
    };

    const handleChange = (id, e) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [id]: e.target.value
        }));
        if (!selectedRowKeys.includes(id)) {
            setSelectedRowKeys(prevKeys => [...prevKeys, id]);
        }
    };
    const handleChangePosition = () => {
      
        const positions = selectedRowKeys.reduce((acc, key) => {
            acc[key] = inputValues[key] || defaultValues[key]; 
            return acc;
        }, {});
        
        // Dispatch action với loại "change-position"
        dispatch(updateMultiAction("change-position", selectedRowKeys, positions))
            .then(() => {
                dispatch(getProductsAdminAction()); 
                setSelectedRowKeys([]);
            })
            .catch(error => {
                notification.error({
                    message: "Thao tác không thành công",
                    description: error.message
                });
            });
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
            title: "Vị trí",
            dataIndex: "position",
            render: (_, record) => {
                // Set default value if not present
                if (!(record._id in defaultValues)) {
                    setDefaultValues(prev => ({
                        ...prev,
                        [record._id]: record.position
                    }));
                }

                return (
                    <Input
                        type="number"
                        value={inputValues[record._id] || record.position}
                        min={1}
                        onBlur={(e) => handleBlur(record._id, e)}
                        onChange={(e) => handleChange(record._id, e)}
                    />
                );
            },
            className: "w-1/12"
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, record) => (
                <Button onClick={() => handleChangeStatus(status, record._id)} className="p-0 m-0">
                    <Tag className="p-1 m-0 w-full" color={status === "active" ? "success" : "error"}>
                        {status === "active" ? "Hoạt động" : "Dừng hoạt động"}
                    </Tag>
                </Button>
            )
        },
        {
            title: 'Người tạo/Ngày tạo',
            dataIndex: 'createdBy',
            render:(_,record)=>(
                <>
                    <span className="block">{record.createdBy.account?record.createdBy.account.fullName:""}</span>
                    <span>{record.createdBy ? moment(record.createdAt).format('DD/MM/YYYY') : ""}</span>
                </>
                
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
                    <Space size="middle">
                    <NavLink to={`/admin/products/edit/${record._id}`} className="bg-yellow-400 p-2 px-3 text-black rounded-md">Sửa</NavLink>
                    <Button
                        onClick={() => handleDelete(record._id)}
                        size="middle"
                        type="primary"
                        danger
                    >
                        Xóa
                    </Button>
                    <NavLink to={`/admin/products/detail/${record._id}`} className="bg-gray-400 p-2 px-3 text-white rounded-md">Chi tiết</NavLink>

                    
                </Space>
                </div>
            ),
            className: "w-[260px]"
        },
    ];

    

    const handleStatusClick = (newStatus) => {
        const newParams = new URLSearchParams(searchParams);
        if (newStatus) {
            newParams.set('status', newStatus);
        } else {
            newParams.delete('status');
        }
        setSearchParams(newParams);
    };

    const handleSearch = (e) => {
        const { keyword } = e;
        const newParams = new URLSearchParams(searchParams);
        if (keyword) {
            newParams.set('keyword', keyword);
        } else {
            newParams.delete('keyword');
        }
        setSearchParams(newParams);
    };

    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text={"Danh sách sản phẩm"} />
                <Card
                    title="Bộ lọc và tìm kiếm"
                    headStyle={{
                        color: '#2d3748',
                        padding: '16px',
                        borderRadius: '0.375rem 0.375rem 0 0',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontWeight: '300'
                    }}
                    bordered={true}
                    size="middle" className="mr-8 mb-6 rounded-md mt-4 shadow-md"
                    
                >
                    <div className="flex items-center justify-between">
                        <FilterStatus currentStatus={currentStatus} handleStatusClick={handleStatusClick} />
                        <Search form={form} handleSearch={handleSearch} />
                    </div>
                </Card>

                {stateProduct.products &&stateProduct.products.length > 0 ? (
                    <Card
                        title="Danh sách"
                        bordered={false}
                        size="middle" className="mr-8 mb-6 shadow-md"
                        headStyle={{
                            color: '#2d3748',
                            padding: '16px',
                            borderRadius: '0.375rem 0.375rem 0 0',
                            width: '100%',
                            boxSizing: 'border-box',
                            fontWeight: '300'
                        }}
                        
                    >
                        <Space align="center" className="pr-9" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <ChangeMulti handleChangePosition={handleChangePosition} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
                            <NavLink to="/admin/products/create">
                                <Button type="text" className="border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white" >Thêm mới</Button>
                            </NavLink>

                        </Space>

                        <Table
                            rowKey={(record) => record._id}
                            size="middle"
                            className="mr-8 mt-5"
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={stateProduct.products}
                            bordered
                            pagination={false}
                        />
                    </Card>
                ) : (
                    <>
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
                        <Space align="center" className="pr-9" style={{ width: '100%', justifyContent:"flex-end" }}>
                                
                                <NavLink to="/admin/products/create" className={"text-right"}>
                                    <Button type="text" className="border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white" >Thêm mới</Button>
                                </NavLink>

                            </Space>

                            <Empty />

                    </Card>
                        
                        
                    </>
                )}
            </div>
        </>
    );
}

export default Product;

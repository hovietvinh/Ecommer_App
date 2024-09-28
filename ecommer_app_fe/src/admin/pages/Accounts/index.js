import { useNavigate, useOutletContext ,NavLink} from "react-router-dom";
import {Col,Button,Card,Row,Table, Image,Tag,Space} from "antd"
import BoxHead from "../../components/BoxHead";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAccountsAction } from "../../../redux/actions/AccountAction";
function Accounts() {
    const {collapsed} = useOutletContext()
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const stateAccounts = useSelector(state=>state.AccountReducer)
    const handleClick = ()=>{
        navigate("/admin/accounts/create")
    }
    useEffect(()=>{
        dispatch(getAccountsAction())
    },[dispatch])
    console.log(stateAccounts.accounts);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (img) => <img className="w-[80px] h-auto" src={img} alt="Không có ảnh"/>,
            className: "w-[150px] h-auto"
        },
        
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
        },
        {
            title:"Phân Quyền",
            dataIndex:"role",
            render:(_,record)=> <span>{record.role?record.role.title:""}</span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, record) => (
                <Button  className="p-0 m-0">
                    <Tag className="p-1 m-0 w-full" color={status === "active" ? "success" : "error"}>
                        {status === "active" ? "Hoạt động" : "Dừng hoạt động"}
                    </Tag>
                </Button>
            )
        },
        
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
                    <Space size="middle">
                    <NavLink  className="bg-yellow-400 p-2 px-3 text-black rounded-md">Sửa</NavLink>
                    <Button
                        // onClick={() => handleDelete(record._id)}
                        size="middle"
                        type="primary"
                        danger
                    >
                        Xóa
                    </Button>
                    <NavLink className="bg-gray-400 p-2 px-3 text-white rounded-md">Chi tiết</NavLink>

                    
                </Space>
                </div>
            ),
            className: "w-[260px]"
        },
    ];

    return (
        <>  
            <div
                className={`transition-all duration-300 ${
                collapsed
                    ? "ml-[100px] w-[calc(100%-100px)]"
                    : "ml-[230px] w-[calc(100%-230px)]"
                } mt-[20px] mr-[20px]`}
            >
                <BoxHead text="Danh sách tài khoản"/>
                {stateAccounts.accounts.length>0  && (
                    <Card
                    title={
                        <Row justify="space-between" align="middle">
                            <Col>
                                <h1 className="text-[16px]">Danh sách</h1>
                            </Col>
                            <Col>
                                <Button 
                                    type="primary" 
                                    onClick={handleClick}
                                    className="text-[16px]"
                                >
                                    Thêm Mới
                                </Button>
                            </Col>
                        </Row>
                    }
                    headStyle={{
                        backgroundColor: '#edf2f7',
                        color: '#2d3748',
                        padding: '16px',
                        borderRadius: '0.375rem 0.375rem 0 0',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontWeight: '300'
                    }}
                    style={{ marginBottom: '20px' }}
                    className="mt-4 mr-8"
                >
                
                    <Table
                        size="middle"
                        className="mr-8 mt-5"
                        
                        columns={columns}
                        dataSource={stateAccounts.accounts}
                        bordered
                    />

                    </Card>
                    // <>{stateAccounts.accounts[0]._id}</>
                )}
                
        </div>
        
        </>
    );
}

export default Accounts;
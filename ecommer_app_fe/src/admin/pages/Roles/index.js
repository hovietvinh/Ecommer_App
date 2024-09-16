import { useNavigate, useOutletContext,NavLink } from "react-router-dom";
import { useEffect } from "react";
import BoxHead from "../../components/BoxHead";
import {Row,Col,Button,Card, Empty,Table,Space} from "antd"
import { getRolesAction } from "../../../redux/actions/RoleAction";
import { useDispatch, useSelector } from "react-redux";

function Roles() {
    const {collapsed} = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stateRoles = useSelector(state=>state.RoleReducer)
    const handleClick = ()=>{
        navigate('/admin/roles/create'); 
    }  
    useEffect(() => {
        dispatch(getRolesAction());
    }, [dispatch]);
    const sanitizeHTML = (htmlString) => {
        return htmlString; // You can use a sanitizer like DOMPurify if necessary
      };
    const columns = [
        {
            title: 'Nhóm quyền',
            dataIndex: 'title',
        },
        {
            title:"Mô tả ngắn",
            dataIndex:"description",
            render:(_,record)=>(
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(record.description || 'N/A'),
                    }}
                />
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="w-full flex items-center justify-center">
                    <Space size="middle">
                    <NavLink to={`/admin/roles/edit/${record._id}`} className="bg-yellow-400 p-2 px-3 text-black rounded-md">Sửa</NavLink>
                    <Button
                        // onClick={() => handleDelete(record._id)}
                        size="middle"
                        type="primary"
                        danger
                    >
                        Xóa
                    </Button>
                    <NavLink  className="bg-gray-400 p-2 px-3 text-white rounded-md">Chi tiết</NavLink>

                    
                </Space>
                </div>
            ),
            className: "w-[260px]"
        },

    ];
    console.log(stateRoles.roles);

    return (
    <>
        <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
            <BoxHead text="Phân quyền"/>
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
                {stateRoles.roles.length>0?(
                    <Table
                        // rowKey={(record) => record._id}
                        size="middle"
                        className="mr-8 mt-5"
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={stateRoles.roles}
                        bordered
                    />
                ):(

                    <Empty/>
                )}

            </Card>

        </div>


    </>
    );
}

export default Roles;
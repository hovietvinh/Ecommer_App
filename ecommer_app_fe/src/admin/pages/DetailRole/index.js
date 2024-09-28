import { Card, Descriptions, List, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { getRoleDetailAction } from "../../../redux/actions/RoleAction";
import BoxHead from "../../components/BoxHead";

function DetailRole() {
    const isObject=(variable)=>{
        return typeof variable === 'object' && 
               variable !== null && 
               !Array.isArray(variable) && 
               Object.keys(variable).length > 0;
    }
    const {collapsed} = useOutletContext()
    const {id} = useParams()
    const dispatch = useDispatch()
    const stateRoles = useSelector(state=>state.RoleReducer)
    console.log(stateRoles);
    useEffect(()=>{
        dispatch(getRoleDetailAction(id))
        
    },[dispatch,id])

    console.log(stateRoles);
    const colums = [
        {

        }
    ]

    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px] mb-7`}>
                <BoxHead text="Chi tiết nhóm quyền"/>
                {isObject(stateRoles.roles) && (
                    <Card
                        className="mt-5"
                    >

                        <Descriptions>
                            <Descriptions.Item span={3} label="Tiêu đề">{stateRoles.roles.title}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Mô tả">{<span dangerouslySetInnerHTML={{ __html: stateRoles.roles.description || 'N/A' }} />}</Descriptions.Item>

                            <Descriptions.Item  label="Tất cả quyền">
                    
                            <List
    
                                dataSource={stateRoles.roles.permissions}
                                renderItem={permission => (
                                <List.Item
                        
                                    style={{ paddingTop: 0 }}
                                >
                                    {permission}
                                </List.Item>
                                )}
                            />

                            </Descriptions.Item>


                        </Descriptions>

                    </Card>

                    
                )}
                
            </div>

        
        </>
    );
}

export default DetailRole;
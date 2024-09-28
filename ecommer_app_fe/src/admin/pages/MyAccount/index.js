import { Button, Descriptions, Image } from "antd";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import BoxHead from "../../components/BoxHead";

function MyAccount() {
    const {collapsed} = useOutletContext()
    const stateAuth = useSelector(state=>state.AuthReducer)
    console.log(stateAuth);
   
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>
                <BoxHead text={"Thông tin cá nhân"} />
                <Descriptions 
                    className="my-8"
                >
                    <Descriptions.Item span={3} ><Image src={stateAuth.account.avatar||""} alt="No avatar"/></Descriptions.Item>
                    <Descriptions.Item span={3} label="Họ và tên">{stateAuth.account.fullName||""}</Descriptions.Item>
                    <Descriptions.Item  span={3} label="Email">{stateAuth.account.email||""}</Descriptions.Item>
                    <Descriptions.Item span={3}  label="Số điện thoại">{stateAuth.account.phone||""}</Descriptions.Item>
                    <Descriptions.Item span={3}  label="Trạng thái">{stateAuth.account.status||""}</Descriptions.Item>
                    <Descriptions.Item span={3}  label="Phân quyền">{stateAuth.role.title||""}</Descriptions.Item>
                </Descriptions>

                
                {/* <Button type="primary" className="p-3">Chỉnh sửa thông tin</Button> */}
               
            </div>

        
        </>
    );
}

export default MyAccount;
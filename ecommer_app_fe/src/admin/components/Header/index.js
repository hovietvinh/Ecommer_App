import { Button, notification } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate()
    const stateAuth = useSelector(state=>state.AuthReducer)
    // console.log(stateAuth);
    const handleClick =()=>{
        localStorage.removeItem("access_token")
        
        
        notification.success({
            message:"Đã đăng xuất"
        })
        navigate("/admin/auth/login")
    }
    const handleClickInfo = ()=>{
        navigate("/admin/my-account")
    }
    return (
        <>
            <div className="bg-gray-900 py-[10px] px-0 sticky top-0 z-50 ">
                <div className="w-full px-4">
                    <div className="flex items-center">
                        <div className="w-1/4">
                            <div className="logo">
                                <NavLink className="text-[24px] font-bold text-white" to="/admin/dashboard">Admin</NavLink>
                            </div>
                        </div>
                        <div className="w-3/4">
                            <div className="text-right">
                                <button onClick={handleClickInfo} className="text-[16px] font-normal bg-blue-500 p-2 transition-all duration-500 hover:bg-blue-800 text-white mr-3">{stateAuth.account? stateAuth.account.fullName:"Unf"}</button>
                                <button onClick={handleClick} className="text-[16px] font-normal bg-red-500 p-2 transition-all duration-500 hover:bg-red-800  text-white">Đăng xuất</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Header;
import { NavLink } from "react-router-dom";

function Header() {
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
                                <NavLink className="text-[16px] font-normal bg-red-500 p-2 transition-all duration-500 hover:bg-red-800  text-white">Đăng xuất</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Header;
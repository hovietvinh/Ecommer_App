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
                    </div>
                </div>

            </div>
        </>
    );
}

export default Header;
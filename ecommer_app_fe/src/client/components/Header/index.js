import { Link, NavLink } from "react-router-dom";
import { Button, Image } from 'antd';
import Tree from "../Tree";
function Header({setValue,value}) {
    return (
        <>
            <div className="border-b border-gray-300 py-[10px]">
                <div className="container max-w-[80%] mx-auto">
                    <div className="items-center flex justify-between">
                        <div className="">
                            <h1 className="text-[23px] text-blue-500 font-bold">ECommer-APP</h1>
                        </div>
                        <div className="p-0 pl-[60px] m-0 flex-wrap flex-1 gap-[20px] flex items-center justify-end">
                            <NavLink to="/" className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Trang chủ</NavLink>
                            <NavLink to="/products" onClick={()=>{setValue(null)}} className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Sản phẩm</NavLink>
                            {/* <NavLink className={"font-normal text-blue-500 text-[16px] hover:text-blue-900"}>Danh mục</NavLink> */}
                            <Tree value={value} setValue={setValue}/>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        
        
        </>
    );
}

export default Header;
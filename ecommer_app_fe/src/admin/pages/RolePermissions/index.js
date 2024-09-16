import { useOutletContext } from "react-router-dom";
import BoxHead from "../../components/BoxHead";
import Test from "./test";

function RolePermissions() {
    const {collapsed} = useOutletContext()
    return (
        <>
            <div 
                    className={`transition-all duration-300 ${
                    collapsed
                        ? "ml-[100px] w-[calc(100%-100px)]"
                        : "ml-[230px] w-[calc(100%-230px)]"
                    } mt-[20px] mr-[20px]`}
            >

                <BoxHead text="Phân quyền"/>

                <Test/>

            </div>
        </>
    );
}

export default RolePermissions;
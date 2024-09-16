import { useSelector } from "react-redux";
import BoxHead from "../../components/BoxHead";

function Dashboard(props) {
    const stateAuth = useSelector(state=>state.AuthReducer)
    
    return (
        <>
            <div className="m-4 relative left-[210px] ">
                <BoxHead text={"Trang tổng quan"}/>
              
            </div>
        </>
    );
}

export default Dashboard;
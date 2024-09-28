import { useDispatch, useSelector } from "react-redux";
import BoxHead from "../../components/BoxHead";
import { Card } from 'antd';
import { useEffect } from "react";
import { getProductsAdminAction } from "../../../redux/actions/ProductAction";
import { getProductCategoryAction } from "../../../redux/actions/ProductCategoryAction";
import { useOutletContext } from "react-router-dom";
function Dashboard() {
    const {collapsed} = useOutletContext()
    const stateAuth = useSelector(state=>state.AuthReducer)
    const stateProduct = useSelector(state=>state.ProductReducer)
    const stateProductCategory = useSelector(state=>state.ProductCategoryReducer)
    // console.log(stateProductCategory);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductsAdminAction())
        dispatch(getProductCategoryAction())
    },[dispatch])
    console.log(stateAuth);

    
    


    const statistic = {
        productsCategory: {
            total: stateProductCategory.productsCategory.length||0,
            active: stateProductCategory.productsCategory.filter(item=>item.status=="active").length||0,
            inactive: stateProductCategory.productsCategory.filter(item=>item.status=="inactive").length||0,
           
        },
        products: {
            total: stateProduct.products.length||0,
            active: stateProduct.products.filter(item=>item.status=="active").length||0,
            inactive: stateProduct.products.filter(item=>item.status=="inactive").length||0,
        },
       
        client: {
            total: 1000,
            active: 950,
            inactive: 50,
        }
    };
    return (
        <>
            <div className={`transition-all duration-300 ${collapsed ? "ml-[100px] w-[calc(100%-100px)]" : "ml-[230px] w-[calc(100%-230px)]"} mt-[20px] mr-[20px]`}>                <BoxHead text={"Trang tổng quan"}/>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">

                <Card title="Sản phẩm" className="mb-4 mb-4 shadow-lg">
                    <p>Số lượng: <b>{statistic.products.total}</b></p>
                    <p>Hoạt động: <b>{statistic.products.active}</b></p>
                    <p>Dừng hoạt động: <b>{statistic.products.inactive}</b></p>
                </Card>
                <Card title="Danh mục sản phẩm" className="mb-4 shadow-lg">
                    <p>Số lượng: <b>{statistic.productsCategory.total}</b></p>
                    <p>Hoạt động: <b>{statistic.productsCategory.active}</b></p>
                    <p>Dừng hoạt động: <b>{statistic.productsCategory.inactive}</b></p>
                </Card>

            

            {/* <Card title="Tài khoản admin" className="mb-4">
                <p>Số lượng: <b>{statistic.admin.total}</b></p>
                <p>Hoạt động: <b>{statistic.admin.active}</b></p>
                <p>Dừng hoạt động: <b>{statistic.admin.inactive}</b></p>
            </Card> */}

            {/* <Card title="Tài khoản client" className="mb-4">
                <p>Số lượng: <b>{statistic.client.total}</b></p>
                <p>Hoạt động: <b>{statistic.client.active}</b></p>
                <p>Dừng hoạt động: <b>{statistic.client.inactive}</b></p>
            </Card> */}
        </div>
            </div>
        </>
    );
}

export default Dashboard;
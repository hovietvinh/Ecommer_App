import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { getProductCategoryAction } from "../../../redux/actions/ProductCategoryAction";
import BoxHead from "../../components/BoxHead";
import DisplayProductCategory from "../../components/DisplayProductCategory";

function ProductCategory() {
    const { collapsed } = useOutletContext();
    
    // console.log(stateProductCategory.productsCategory);
    return (
        <>
            
            <div
            className={`transition-all duration-300 ${
            collapsed
                ? "ml-[100px] w-[calc(100%-100px)]"
                : "ml-[230px] w-[calc(100%-230px)]"
            } mt-[20px] mr-[20px]`}
            >
                <BoxHead text={"Danh mục sản phẩm"}/>

            

                <DisplayProductCategory />
            </div>
            
            
        </>
    );
}

export default ProductCategory;
import { getProductCategoryApi } from "../../../utils/apiClient";
import {notification} from "antd"
const getProductCategoryAction = ()=>{
    return async(dispatch)=>{
        try {
        
            const response = await getProductCategoryApi()
            // console.log(response);
            if(response.code==200){
                dispatch({
                    type: "GET_PRODUCT_CATEGORY_CLIENT",
                    data:response.data,
                    tree:response.tree
                });
            }
            else{
                notification.error({
                    message:response.message,
                })
            }
        } catch (error) {
            notification.error({
                message:"Lấy dữ liệu thất bại",
                description: error.message
            })
        }
    }
}

export {
    getProductCategoryAction
}
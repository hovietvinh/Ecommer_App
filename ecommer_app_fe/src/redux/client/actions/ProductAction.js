import { getProductDetaiSluglApi, getProductsApi, getProductsBySlugCategoryApi } from "../../../utils/apiClient";
import {notification} from "antd"
export const getProductsAction = ()=>{
    return async(dispatch)=>{
        try {
            const data = await getProductsApi();
        
            if(data.code==200){
              
                dispatch({
                    type:"GET_PRODUCTS",
                    data:data.data,
                })
            }
            else{
                
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " + `${data.code}`,
                    description: data.message
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


export const getProductsBySlugCategoryAction = (slugCategory)=>{
    return async(dispatch)=>{
        try {
            const data = await getProductsBySlugCategoryApi(slugCategory)
        
            if(data.code==200){
                dispatch({
                    type:"GET_PRODUCTS_BY_CATEGORY",
                    data:data.data
                })
                return data.category
            }
            else{
                
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " + `${data.code}`,
                    description: data.message
                })
                return null
            }
        } catch (error) {
            notification.error({
                message:"Lấy dữ liệu thất bại",
                description: error.message
            })
            return null
        }
    }
}

export const getProductDetaiSluglAction = (slug)=>{
    return async(dispatch)=>{
        try {
            const response = await getProductDetaiSluglApi(slug)
            if(response.code==200){
                dispatch({
                    type: "GET_DETAIL_PRODUCT",
                    data:response.data
                });
               
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại" ,
                    description: response.message
                })
            }
        } catch (error) {
            notification.error({
                message:error.message,
                // description: error.message
            })
        }
    }
}

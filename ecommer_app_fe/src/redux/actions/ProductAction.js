import { getProductsAdminApi, getProductsApi } from "../../utils/api"
import { notification } from 'antd';

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

export const getProductsAdminAction = (params = {})=>{
    return async(dispatch)=>{
        try {
            const data = await getProductsAdminApi(params);
            if(data.code==200){
              
                dispatch({
                    type:"GET_PRODUCTS_ADMIN",
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
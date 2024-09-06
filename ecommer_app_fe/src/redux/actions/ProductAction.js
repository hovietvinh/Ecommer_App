import { getProductsAdminApi, getProductsApi, updateMultiApi, updateStatusProductApi } from "../../utils/api"
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
                    message:"Lấy dữ liệu thất bại code: ",
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
export const updateStatusProductAction = (status,id)=>{
    return async(dispatch)=>{
        try {
            const data = await updateStatusProductApi(status,id);
            if(data.code==200){
                dispatch({
                    type: "UPDATE_PRODUCT_STATUS_SUCCESS",
                    payload: { status, id }
                });
                notification.success({
                    message:"Thao tác thành công" ,
                    description: data.message
                })
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " ,
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

export const updateMultiAction = (type,ids)=>{
    return async(dispatch)=>{
        try {
            const data = await updateMultiApi(type,ids)
            if(data.code==200){
                dispatch({
                    type: "UPDATE_MULTI",
                    payload: { type, ids }
                });
                notification.success({
                    message:"Thao tác thành công" ,
                    description: data.message
                })
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " ,
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
import { createProductApi,getProductDeletedApi, deleteProductApi, getProductDetailApi, getProductDetaiSluglApi, getProductsAdminApi, getProductsApi, updateMultiApi, updateProductApi, updateStatusProductApi, deletedPermanentlyProductApi, returnDeletedApi } from "../../utils/api"
import { notification } from 'antd';

// export const getProductsAction = ()=>{
//     return async(dispatch)=>{
//         try {
//             const data = await getProductsApi();
//             if(data.code==200){
              
//                 dispatch({
//                     type:"GET_PRODUCTS",
//                     data:data.data,
//                 })
//             }
//             else{
                
//                 notification.error({
//                     message:"Lấy dữ liệu thất bại code: " + `${data.code}`,
//                     description: data.message
//                 })
//             }
//         } catch (error) {
//             notification.error({
//                 message:"Lấy dữ liệu thất bại",
//                 description: error.message
//             })
//         }
//     }
// }

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

export const updateMultiAction = (type,ids,positions={})=>{
    return async(dispatch)=>{
        try {
            const data = await updateMultiApi(type,ids,positions)
            if(data.code==200){
                dispatch({
                    type: "UPDATE_MULTI",
                    payload: { type, ids,positions }
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
export const deleteProductAction = (id)=>{
    return async(dispatch)=>{
        try {
            const data = await deleteProductApi(id);
            if(data.code==200){
                dispatch({
                    type: "DELETE_PRODUCT",
                    payload:id
                });
                notification.success({
                    message:data.message
                   
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

export const createProductAction = (data)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await createProductApi(data)
            
            if(response.code==200){
                dispatch({
                    type: "CREATE_PRODUCT",
                    data:response.data
                });
                notification.success({
                    message:response.message
                   
                })
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " ,
                    description: response.message
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

export const getProductDetailAction = (id)=>{
    return async(dispatch)=>{
        try {
            const response = await getProductDetailApi(id)
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
                message:"Lấy dữ liệu thất bại",
                description: error.message
            })
        }
    }
}
export const updateProductAction =(id,values)=>{
    return async(dispatch)=>{
        try {
            const response = await updateProductApi(id,values)
            if(response.code==200){
                dispatch({
                    type: "UPDATE_PRODUCT",
                    // data:response.data
                });
                notification.success({
                    message:response.message
                   
                })
               
            }
            else{
                notification.error({
                    message:response.message
                   
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

// export const getProductDetaiSluglAction = (slug)=>{
//     return async(dispatch)=>{
//         try {
//             const response = await getProductDetaiSluglApi(slug)
//             if(response.code==200){
//                 dispatch({
//                     type: "GET_DETAIL_PRODUCT",
//                     data:response.data
//                 });
               
//             }
//             else{
//                 notification.error({
//                     message:"Lấy dữ liệu thất bại" ,
//                     description: response.message
//                 })
//             }
//         } catch (error) {
//             notification.error({
//                 message:error.message,
//                 // description: error.message
//             })
//         }
//     }
// }

export const getProductDeletedAction = ()=>{
    return async(dispatch)=>{
        try {
            const response = await getProductDeletedApi()
            if(response.code==200){
                dispatch({
                    type: "GET_PRODUCT_DELETED",
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

export const deletedPermanentlyProductAction = (id)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await deletedPermanentlyProductApi(id)
            
            if(response.code==200){
                dispatch({
                    type: "DELETED_PERMANENTLY_PRODUCT",
                    // payload:id
                });
                notification.success({
                    message:response.message
                   
                })
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " ,
                    description: response.message
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




export const returnDeletedAction = (id)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await returnDeletedApi(id)
            
            if(response.code==200){
                dispatch({
                    type: "RETURN_DELETED_PRODUCT",
                    payload:id
                });
                notification.success({
                    message:response.message
                   
                })
            }
            else{
                notification.error({
                    message:"Lấy dữ liệu thất bại code: " ,
                    description: response.message
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

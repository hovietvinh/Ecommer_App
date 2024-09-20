import { createProductCategoryApi, updateProductCategoryApi,getProductCategoryAdminApi, getProductCategoryDeletedApi, getProductCategoryDetailApi, deleteProductCategoryApi, deletedPermanentlyProductCategoryApi, returnDeletedProductCategoryApi } from "../../utils/api";
import { notification } from 'antd';

export const createProductCategoryAction = (data) => {
    return async (dispatch) => {
        try {
            // console.log(data);
            const response = await createProductCategoryApi(data);
            
            if (response.code === 200) {
                dispatch({
                    type: "CREATE_PRODUCT_CATEGORY",
                    data: response.data,
                });
                notification.success({
                    message: response.message
                });
            } else {
                notification.error({
                    message: response.message
                });
            }
        } catch (error) {
            notification.error({
                message: error.message
            });
        }
    };
};

export const getProductCategoryAction = ()=>{
    return async(dispatch)=>{
        try {
            const data = await getProductCategoryAdminApi()
            if(data.code==200){
              
                dispatch({
                    type:"GET_PRODUCTS_CATEGORY_ADMIN",
                    data:data.data,
                    tree:data.tree
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

export const getProductCategoryDeletedAction = ()=>{
    return async(dispatch)=>{
        try {
            const response = await getProductCategoryDeletedApi()
            if(response.code==200){
                dispatch({
                    type: "GET_PRODUCT_CATEGORY_DELETED",
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

export const getProductCategoryDetailAction = (id)=>{
    return async(dispatch)=>{
        try {
            const response = await getProductCategoryDetailApi(id)
            if(response.code==200){
                dispatch({
                    type: "GET_DETAIL_PRODUCT_CATEGORY",
                    data:response.data,
                    tree:response.tree
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

export const updateProductCategoryAction =(id,values)=>{
    return async(dispatch)=>{
        try {
            const response = await updateProductCategoryApi(id,values)
            if(response.code==200){
                dispatch({
                    type: "UPDATE_PRODUCT_CATEGORY",
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

export const deleteProductCategoryAction =(id,values)=>{
    return async(dispatch)=>{
        try {
            const response = await deleteProductCategoryApi(id)
            if(response.code==200){
                dispatch({
                    type: "DELETE_PRODUCT_CATEGORY",
                    payload:id
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

export const deletedPermanentlyProductCategoryAction = (id)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await deletedPermanentlyProductCategoryApi(id)
            
            if(response.code==200){
                dispatch({
                    type: "DELETED_PERMANENTLY_PRODUCT_CATEGORY",
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



export const returnDeletedProductCategoryAction = (id)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await returnDeletedProductCategoryApi(id)
            
            if(response.code==200){
                dispatch({
                    type: "RETURN_DELETED_PRODUCT_CATEGORY",
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
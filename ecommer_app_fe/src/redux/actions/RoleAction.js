import { createRoleApi, getRoleDetailApi, getRolesApi, updatePermissionsApi } from "../../utils/api";
import {notification} from "antd"

export const getRolesAction = ()=>{
    return async(dispatch)=>{
        try {
            const data = await getRolesApi()
            if(data.code==200){
              
                dispatch({
                    type:"GET_ROLES",
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

export const createRoleAction = (data)=>{
    return async(dispatch)=>{
        try {
        
            const response = await createRoleApi(data)
            
            if(response.code==200){
                dispatch({
                    type: "CREATE_ROLE",
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

export const getRoleDetailAction = (id)=>{
    return async(dispatch)=>{
        try {
            const response = await getRoleDetailApi(id)
            if(response.code==200){
                dispatch({
                    type: "GET_DETAIL_ROLE",
                    data:response.data,
               
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

export const updatePermissionsAction = (data)=>{
    return async(dispatch)=>{
        try {
            const response = await updatePermissionsApi(data)
            if(response.code==200){
                dispatch({
                    type: "UPDATE_PERMISSIONS",
                });

                notification.success({
                    message:response.message
                   
                })
               
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
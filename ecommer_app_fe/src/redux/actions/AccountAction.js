import {notification} from "antd"
import { createAccountApi, getAccountsApi } from "../../utils/api";
export const createAccountAction = (data)=>{
    return async(dispatch)=>{
        try {
        
            const response = await createAccountApi(data)
            
            if(response.code==200){
                dispatch({
                    type: "CREATE_ACCOUNT",
                    data:response.data
                });
                notification.success({
                    message:response.message
                   
                })
            }
            else{
                notification.error({
                    message:response.message ,
                   
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

export const getAccountsAction = ()=>{
    return async(dispatch)=>{
        try {
            const data = await getAccountsApi()
            if(data.code==200){
              
                dispatch({
                    type:"GET_ACCOUNTS",
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
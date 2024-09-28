import {notification} from "antd"
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { checkAuthApi, loginAccountsApi } from "../../utils/api";
export const loginAccountAction = (data)=>{
    return async(dispatch)=>{
        try {
        
            const response = await loginAccountsApi(data)
            
            if(response.code==200){
                const { access_token,data } = response;
                dispatch({
                    type: "LOGIN_ACCOUNT",
                    data:response.data,
                    access_token:response.access_token
                });
                notification.success({
                    message:"Đăng nhập thành công"
                   
                })
                return {
                    access_token:access_token,
                    role:data.role
                }
            }
            else{
                notification.error({
                    message:response.message,
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

export const checkAuthAction = ()=>{
    return async(dispatch)=>{
        try {
            const response = await checkAuthApi()
            if(response.code ==200){
                dispatch({
                    type: "CHECK_AUTH",
                    data:response.data,
                    access_token:response.access_token
                });
                return response
            }
            else{
                
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

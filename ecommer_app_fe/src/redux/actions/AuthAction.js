import {notification} from "antd"
import { loginAccountsApi } from "../../utils/api";
export const loginAccountAction = (data)=>{
    return async(dispatch)=>{
        try {
        
            const response = await loginAccountsApi(data)
            
            if(response.code==200){
                const { access_token } = response;
                dispatch({
                    type: "LOGIN_ACCOUNT",
                    data:response.data,
                    access_token:response.access_token
                });
                notification.success({
                    message:"Đăng nhập thành công"
                   
                })
                return access_token
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

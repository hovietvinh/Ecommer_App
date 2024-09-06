import axios from "./axios.customize"

const getProductsApi = async()=>{
    try {
        const URL_LOGIN ='/api/products'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const getProductsAdminApi = async(params = {})=>{
    try {
        const URL_LOGIN ='/api/admin/products'
        // console.log(params);
        const response = await axios.get(URL_LOGIN, { params })
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
export {
    getProductsApi,
    getProductsAdminApi
}
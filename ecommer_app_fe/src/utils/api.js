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
const updateStatusProductApi = async(status,id)=>{
    try {
        const URL_LOGIN =`/api/admin/products/change-status/${status}/${id}`
        const response = await axios.patch(URL_LOGIN)
        return response
        
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const updateMultiApi = async (type,ids,positions)=>{
    try {
        const data={
            type:type,
            ids:ids,
            positions:positions
        }
        const URL_LOGIN =`/api/admin/products/change-multi`
        const response = await axios.patch(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const deleteProductApi = async(id)=>{
    try {
        const URL_LOGIN =`/api/admin/products/delete/${id}`
        const response = await axios.delete(URL_LOGIN)
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
    getProductsAdminApi,
    updateStatusProductApi,
    updateMultiApi,
    deleteProductApi
}
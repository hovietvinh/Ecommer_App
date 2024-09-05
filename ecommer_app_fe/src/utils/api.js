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
export {
    getProductsApi
}
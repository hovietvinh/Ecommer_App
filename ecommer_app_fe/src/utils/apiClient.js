import axios from "./axios.customize"
const getProductCategoryApi = async()=>{
    try {
        // console.log(1);
        const URL_LOGIN ='/api/products-category'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}

const getProductsBySlugCategoryApi = async(slugCategory)=>{
    try {
        const URL_LOGIN =`api/products/${slugCategory}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}


const getProductsApi = async()=>{
    try {
        // console.log(1);
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
    getProductCategoryApi,
    getProductsApi,
    getProductsBySlugCategoryApi
}
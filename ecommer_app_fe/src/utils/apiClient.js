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

const getProductDetaiSluglApi= async(slug)=>{
    try {
        // console.log(123);
        const URL_LOGIN =`/api/products/detail/${slug}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}

const getProductsByKeywordApi = async(keyword)=>{
    try {
        const URL_LOGIN =`/api/search?keyword=${keyword}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
            
        }
    }
}
const createCardIdApi = async()=>{
    try {
        const URL_LOGIN =`/api/cart/create`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
            
        }
    }
}
const pushProductIntoCartApi = async(productId,data)=>{
    try {
        const URL_LOGIN =`/api/cart/add/${productId}`
        const response = await axios.post(URL_LOGIN,data,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
            
        }
    }
}

const getCartApi = async()=>{
    try {
        const URL_LOGIN =`/api/cart`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
            
        }
    }
}
const deleteProductInCart =async(id)=>{
    try {
        const URL_LOGIN =`/api/cart/delete/${id}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
            
        }
    }
}
const updateProductInCart =async(productId,quantity)=>{
    try {
        const URL_LOGIN =`/api/cart/update/${productId}/${quantity}`
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
    getProductsBySlugCategoryApi,
    getProductDetaiSluglApi,
    getProductsByKeywordApi,
    createCardIdApi,
    pushProductIntoCartApi,
    getCartApi,
    deleteProductInCart,
    updateProductInCart
}
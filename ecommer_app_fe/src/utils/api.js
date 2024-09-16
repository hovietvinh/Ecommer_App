import axios from "./axios.customize"

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
const deletedPermanentlyProductApi = async(id)=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/admin/products/deletedPermanently/${id}`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN)
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

const createProductApi = async(data)=>{
    try {
        const URL_LOGIN =`/api/admin/products/create`
        // console.log(data);
        const response = await axios.post(URL_LOGIN,data,{
            headers:{
                // 'Content-Type': 'application/json'
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
const getProductDetailApi= async(id)=>{
    try {
        // console.log(123);
        const URL_LOGIN =`/api/admin/products/detail/${id}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}
const updateProductApi = async(id,values)=>{
    try {
        const URL_LOGIN =`/api/admin/products/edit/${id}`
        const response = await axios.patch(URL_LOGIN,values,{
            headers: {
            //   'Content-Type': 'application/json'
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
const createProductCategoryApi = async(data)=>{
    try {
        const URL_LOGIN =`/api/admin/products-category/create`
        // console.log(data);
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
const getProductCategoryAdminApi = async()=>{
    try {
        // console.log(1);
        const URL_LOGIN ='/api/admin/products-category'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const getProductDeletedApi = async()=>{
    try {
      
       
        const URL_LOGINPRODUCT = '/api/admin/products/deleted'
        const responseP = await axios.get(URL_LOGINPRODUCT)
        return responseP
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const getProductCategoryDeletedApi = async()=>{
    try {
      
       
        const URL_LOGIN = '/api/admin/products-category/deleted'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}
const getProductCategoryDetailApi = async(id)=>{
    try {
        // console.log(123);
        const URL_LOGIN =`/api/admin/products-category/detail/${id}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}
const updateProductCategoryApi = async(id,values)=>{
    try {
        const URL_LOGIN =`/api/admin/products-category/edit/${id}`
        const response = await axios.patch(URL_LOGIN,values)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}
const deleteProductCategoryApi = async(id)=>{
    try {
        const URL_LOGIN =`/api/admin/products-category/delete/${id}`
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}

const createRoleApi = async(data)=>{
    try {
        const URL_LOGIN =`/api/admin/roles/create`
        // console.log(data);
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
const getRolesApi = async()=>{
    try {
        // console.log(1);
        const URL_LOGIN ='/api/admin/roles'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}

const getRoleDetailApi = async(id)=>{
    try {
        // console.log(123);
        const URL_LOGIN =`/api/admin/roles/detail/${id}`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}

const updatePermissionsApi = async(data)=>{
    try {
        // console.log(123);
        const URL_LOGIN =`/api/admin/roles/permissions`
        const response = await axios.patch(URL_LOGIN,data,{
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

const createAccountApi = async(data)=>{
    try {
        const URL_LOGIN =`/api/admin/accounts/create`
        // console.log(data);
        const response = await axios.post(URL_LOGIN,data)
        return response
        
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }  
    }
}
const getAccountsApi = async()=>{
    try {
      
        const URL_LOGIN ='/api/admin/accounts'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            code:400,
            message:"Error in axios!"
        }
    }
}

const loginAccountsApi = async(data)=>{
    try {
      
        const URL_LOGIN ='/api/admin/auth/login'
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
const checkAuthApi = async()=>{
    try {
      
        const URL_LOGIN ='/api/admin/auth/checkAuth'
        const response = await axios.post(URL_LOGIN)
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
    deleteProductApi,
    createProductApi,
    getProductDetailApi,
    updateProductApi,
    getProductDetaiSluglApi,
    createProductCategoryApi,
    getProductCategoryAdminApi,
    getProductDeletedApi,
    getProductCategoryDeletedApi,
    getProductCategoryDetailApi,
    updateProductCategoryApi,
    deleteProductCategoryApi,
    deletedPermanentlyProductApi,
    createRoleApi,
    getRolesApi,
    getRoleDetailApi,
    updatePermissionsApi,
    createAccountApi,
    getAccountsApi,
    loginAccountsApi,
    checkAuthApi
}
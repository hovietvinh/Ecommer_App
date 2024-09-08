const Product = require("../../models/product.model")
//[GET] /api/products
module.exports.index = async(req,res)=>{
    try{
        let find= {
            deleted:false,
            status:"active"
        }
        const products = await Product.find(find).sort({position:"desc"})
    
        
        res.json({
            code:200,
            data:products
        })
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}

// [GET] /api/products/detail/:slug
module.exports.detail = async(req,res)=>{
    
    try{
        const {slug} = req.params
        let find={
            deleted:false,
            slug:slug,
            status:"active"
        }
        
        const products = await Product.findOne(find)
        
        if(products){
            res.json({
                code:200,
                data:products
            })
        }
        else{
            res.json({
                code:400,
                message:"Sản phẩm đã bị xóa hoặc k tồn tại"
            })
        }
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}
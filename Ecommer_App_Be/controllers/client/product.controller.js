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
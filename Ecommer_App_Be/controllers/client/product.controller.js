const Product = require("../../models/product.model")

module.exports.index = async(req,res)=>{
    try{
        let find= {
            deleted:false,
            status:"active"
        }
        const products = await Product.find(find)
    
        
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
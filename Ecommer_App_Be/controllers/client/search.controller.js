const Product = require("../../models/product.model")
module.exports.index = async(req,res)=>{
    try{
        const {keyword} = req.query
        if(keyword){
            const keywordRegex = new RegExp(keyword,"i");
            const products = await Product.find({
                deleted:false,
                status:"active",
                title:keywordRegex
            })
            res.json({
                code:200,
                data:products
            })
        }
        else{
            res.json({
                code:400,
                message:"Vui lòng truyền keyword"
            })
        }
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}
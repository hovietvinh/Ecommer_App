const Product = require("../../models/product.model")
module.exports.index = async(req,res)=>{
    try{
        let find= {
            deleted:false
        }
        const {status} = req.query
        if(status){
            find.status = status
        }
        let keyword = ''
        if(req.query.keyword){
            keyword=req.query.keyword
            const regex = new RegExp(keyword,'i')
            find.title=regex
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
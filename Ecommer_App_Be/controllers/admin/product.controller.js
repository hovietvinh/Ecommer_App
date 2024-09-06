const Product = require("../../models/product.model")
const  searchHelpers = require("../../helpers/search")

// [GET] /api/admin/products
module.exports.index = async(req,res)=>{
    try{
        let find= {
            deleted:false
        }
        const {status} = req.query
        if(status){
            find.status = status
        }

        const objectSearch = searchHelpers(req.query)
        if(objectSearch.regex){
            find.title = objectSearch.regex
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

// [PATCH] /api/admin/change-status/:status/:id
module.exports.changeStatus = async (req,res)=>{
    try {
        const {status,id} = req.params
        
        await Product.updateOne({_id:id},{status:status})
 
        res.json({
            code:200,
            message:"Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

// [PATCH] /api/admin/changeMulti
module.exports.changeMulti = async (req,res)=>{
    try {
        const {type,ids} = req.body
        // console.log(type,ids);
        switch (type) {
            case "active":
               
                await Product.updateMany({ _id: { $in: ids } },{ $set: { status: 'inactive' } })
                break;
            case "inactive":
                await Product.updateMany({ _id: { $in: ids } },{ $set: { status: 'active' } })
               
            break;
        
            default:
                break;
        }
        res.json({
            code:200,
            message:"Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}
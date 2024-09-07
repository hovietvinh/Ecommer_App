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
        const {type,ids,positions} = req.body
        // console.log(type,ids);
        switch (type) {
            case "active":
               
                await Product.updateMany({ _id: { $in: ids } },{ $set: { status: 'active' } })
                
                break;
            case "inactive":
                await Product.updateMany({ _id: { $in: ids } },{ $set: { status: 'inactive' } })
                break;
            case "delete-all":
                await Product.updateMany(
                    { _id: { $in: ids } }, 
                    { 
                        $set: { 
                            deleted:true,
                            deletedAt:new Date()
                        }
                    }
                );
                break;
            case "change-position":
                await Product.updateMany({_id: { $in: ids } },{
                    $set: { 
                        position:positions[ids]
                    }
                })
        
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

// [DELETE] /api/admin/delete/:id
module.exports.delete = async(req,res)=>{
    try {
        const {id} = req.params
        await Product.updateOne({_id:id},{
            deleted:true,
            deletedAt:new Date()
        })

        res.json({
            code:200,
            message:"Xóa sản phẩm thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}
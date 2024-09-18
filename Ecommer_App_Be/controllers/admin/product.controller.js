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
    
        // console.log(products);
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

// [GET] /api/admin/products/deleted
module.exports.deleted = async(req,res)=>{
    try{

        let find= {
            deleted:true
        }
        

        
        const products = await Product.find(find)
    
        // console.log(products);
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

// [GET] /api/admin/products/detail/:id
module.exports.detail = async(req,res)=>{
    
    try{
        const {id} = req.params
        let find={
            deleted:false,
            _id:id
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
// [POST] /api/admin/products/create
module.exports.create = async(req,res)=>{
    try{
       
    //    console.log(req.body);
        if(req.body.price){
            req.body.price = parseFloat(req.body.price )
        }
        else{
            req.body.price=1    
        }
        if(req.body.discountPercentage){
            req.body.discountPercentage = parseInt(req.body.discountPercentage )
        }else{
            req.body.discountPercentage = 0
        }
        if( req.body.stock){
            req.body.stock = parseInt(req.body.stock )
        }
        else{
            req.body.stock=1
        }
    
        
        if(!req.body.position){
           
            const countProduct = await Product.countDocuments();
            req.body.position= countProduct+1
            
        }
        else{
            req.body.position= parseInt(req.body.position)
        }
        // if(req.file){
        //      req.body.thumbnail = req.file.path;
        // }

    //    console.log(req.body);

        const product = new Product(req.body)
        await product.save()

        res.json({
            code:200,
            message:"Tạo sản phẩm thành công",
            data:product
        })
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}


// [PATCH] /api/admin/products/edit/:id
module.exports.edit = async(req,res)=>{
    
    try{
        // const data = req.body
        
        if(req.body.price){
            req.body.price = parseFloat(req.body.price )
        }
        else{
            req.body.price=1    
        }
        if(req.body.discountPercentage){
            req.body.discountPercentage = parseInt(req.body.discountPercentage )
        }else{
            req.body.discountPercentage = 0
        }
        if( req.body.stock){
            req.body.stock = parseInt(req.body.stock )
        }
        else{
            req.body.stock=1
        }
        
        // console.log(req.body.position);
        
        if(!req.body.position){
            // console.log(req.body);
            const countProduct = await Product.countDocuments();
            req.body.position= countProduct+1
            
        }
        else{
            req.body.position= parseInt(req.body.position)
        }
        const {id} = req.params
        let find={
            deleted:false,
            _id:id
        }
        
        await Product.updateOne(find,req.body)
        
        res.json({
            code:200,
            message:"Cập nhật thành công"
        })
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}

module.exports.deletedPermanently =async(req,res)=>{
    
    try{
      
        // console.log(req.params.id);
        await Product.deleteOne({_id:req.params.id})
        
        
        // await Product.updateOne(find,req.body)
        
        res.json({
            code:200,
            message:"Đã xóa vĩnh viễn"
        })
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}

// [PATCH] /api/admin/products/returnDeleted
module.exports.returnDeleted = async(req,res)=>{
    
    try {
        const {id} = req.params
        await Product.updateOne({_id:id},{
            deleted:false,
        })

        res.json({
            code:200,
            message:"Khôi phục sản phẩm thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}
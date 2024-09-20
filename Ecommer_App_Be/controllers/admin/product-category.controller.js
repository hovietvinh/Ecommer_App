const ProductCategory = require("../../models/product-category.model")
const { listeners } = require("../../models/product.model")
//[GET] /api/admin/product-category
module.exports.index =async(req,res)=>{
    try {
        let find= {
            deleted:false
        }

        const data = await ProductCategory.find(find);
        let newData = []
        for (const item of data) {
            if (item.parent_id) {
                const Parent = await ProductCategory.findOne({ _id: item.parent_id });
                let plainItem = item.toObject();  // Convert to plain JavaScript object
                plainItem["infoParent"] = Parent;
                newData.push(plainItem)
                // console.log(plainItem, 1);
            }
            else{
                let plainItem = item.toObject();  // Convert to plain JavaScript object
              
                newData.push(plainItem)
            }
        }
        // console.log(newData);

        // console.log(data);
        const createTree = (arr,parentId = '')=>{
            const tree=[]
            arr.forEach((item)=>{
                if(item.parent_id==parentId){
                    // let newItem = {item};
                    let newItem={
                        value: item._id,
                        key:item._id,
                        title:item.title
                    }
                   

                    const children =createTree(arr,item.id);
                    if(children.length>0){
                        newItem.children=children
                    
                    }
                    tree.push(newItem)
                }
            })
            return tree
        }
        // console.log(createTree(data));
        res.json({
            code:200,
            data:newData,
            tree:createTree(data)
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}
//[GET] /api/admin/product-category/detail/:id
module.exports.detail =async(req,res)=>{
    try {
        let find= {
            deleted:false,
            _id:req.params.id
        }
        const dataTree = await ProductCategory.find({deleted:false})

        const createTree = (arr,parentId = '')=>{
            const tree=[]
            arr.forEach((item)=>{
                if(item.parent_id==parentId){
                    // let newItem = {item};
                    let newItem={
                        value: item._id,
                        key:item._id,
                        title:item.title
                    }
                   

                    const children =createTree(arr,item.id);
                    if(children.length>0){
                        newItem.children=children
                    
                    }
                    tree.push(newItem)
                }
            })
            return tree
        }

        const data = await ProductCategory.findOne(find)

        
        // console.log(createTree(data));
        res.json({
            code:200,
            data:data,
            tree:createTree(dataTree)
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[GET] /api/admin/product-category/deleted
module.exports.deleted =async(req,res)=>{
    try {
        let find= {
            deleted:true
        }
        

        const data = await ProductCategory.find(find)

        let newData = []
        for(const item of data){
            if(item.parent_id){
                const Parent = await ProductCategory.findOne({ _id: item.parent_id });
                let plainItem = item.toObject();  // Convert to plain JavaScript object
                plainItem["infoParent"] = Parent;
                newData.push(plainItem)
            }
            else{
                newData.push(item)
            }
        }

        
        res.json({
            code:200,
            data:newData,
            // tree:createTree(data)
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[POST] /api/admin/product-category/create
module.exports.create = async(req,res)=>{
    try {
        // console.log(req.body);
    if(!req.body.position){
        console.log(req.body);
        const count = await ProductCategory.countDocuments();
        req.body.position= count+1
        
    }
    else{
        req.body.position= parseInt(req.body.position)
    }
    // console.log(req.body);
    const record = new  ProductCategory(req.body)
    await record.save()


    res.json({
        code:200,
        message:"Tạo thành công",
        data:record
    })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[PATCH] /api/admin/product-category/edit/:id
module.exports.edit =async(req,res)=>{
    try {
        // console.log(req.body);
        if(!req.body.position){
            // console.log(req.body);
            const countDocument = await ProductCategory.countDocuments();
            req.body.position= countDocument+1
            
        } 
        else{
            req.body.position= parseInt(req.body.position)
        }

        const {id} = req.params
        let find={
            deleted:false,
            _id:id
        }

        await ProductCategory.updateOne(find,req.body)
        
        res.json({
            code:200,
            message:"Cập nhật thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[GET] /api/admin/product-category/delete/:id
module.exports.delete =async(req,res)=>{
    try {
        let find= {
            deleted:false,
            _id:req.params.id
        }

   
      
       await ProductCategory.updateOne(find,{deleted:true})
       
        // console.log(createTree(data));
        res.json({
            code:200,
            message:"Xoá thành công"
          
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[GET] /api/admin/product-category/deletedPermanently/:id
module.exports.deletedPermanently = async(req,res)=>{
    try{
        // console.log(req.params.id);
        // console.log(req.params.id);
        await ProductCategory.deleteOne({_id:req.params.id})
        
        
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




// [PATCH] /api/admin/products-category/returnDeleted/:id
module.exports.returnDeleted = async(req,res)=>{
    
    try {
        const {id} = req.params
        await ProductCategory.updateOne({_id:id},{
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
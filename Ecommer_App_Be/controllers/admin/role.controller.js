const Role = require("../../models/role.model")
//[GET] api/admin/roles
module.exports.index = async(req,res)=>{
    try{

        let find= {
            deleted:false
        }


     
        const roles = await Role.find(find)
    
        // console.log(products);
        res.json({
            code:200,
            data:roles
        })
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }


}

//[POST] api/admin/roles/create
module.exports.create = async(req,res)=>{
    try {
        const data = req.body;
        const newRole = new Role(data)
        await newRole.save()
        res.json({
            code:200,
            message:"Thêm mới nhóm quyền thành công",
            data:newRole
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }




}

//[GET] /api/admin/roles/detail/:id
module.exports.detail =async(req,res)=>{
    try {
        let find= {
            deleted:false,
            _id:req.params.id
        }
     

    
        const data = await Role.findOne(find)

        
        // console.log(createTree(data));
        res.json({
            code:200,
            data:data,
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

//[PATCH] /api/admin/roles/permissions
module.exports.permissions =async(req,res)=>{
    try {
        const data =req.body
        for (const item of data){
            await Role.updateOne({_id:item._id},{permissions:item.permissions})
        }

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


//[GET] api/admin/roles/delete/:id
module.exports.delete = async(req,res)=>{
    try{
        const {id} = req.params
        let find= {
            deleted:false,
            _id:id
        }


     
        // const roles = await Role.findOne(find)

        await  Role.updateOne({
            _id:id,
            deleted:false
        },{
            deleted:true,
            deletedAt:new Date()
        })

        res.json({
            code:200,
            message:"Xóa nhóm quyền thành công"
        })
    
        // console.log(products);
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }


}

//[PATCH] api/admin/roles/edit/:id
module.exports.edit = async(req,res)=>{
    try{
        const {id} = req.params
        const data = req.body
        let find= {
            deleted:false,
            _id:id
        }
        console.log(id,data);


     
        // const roles = await Role.findOne(find)

        await  Role.updateOne({
            _id:id,
            deleted:false
        },data)

        res.json({
            code:200,
            message:"Cập nhật thành công"
        })
    
        // console.log(products);
        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }


}
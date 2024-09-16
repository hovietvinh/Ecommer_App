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
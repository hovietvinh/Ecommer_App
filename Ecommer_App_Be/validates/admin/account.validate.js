module.exports.account = (req,res,next)=>{
    if(!req.body.fullName){
        res.json({
            code:400,
            message:"Không được để trống tên"
        })
        return;
    }
    if(!req.body.email){
        res.json({
            code:400,
            message:"Không được để trống email"
        })
        return;
    }
    if(!req.body.password){
        res.json({
            code:400,
            message:"Không được để trống password"
        })
        return;
    }
    if(!req.body.role_id){
        res.json({
            code:400,
            message:"Không được để trống nhóm quyền"
        })
        return;
    }
    next()
}   
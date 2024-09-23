module.exports.register = (req,res,next)=>{
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
  
    next()
}   

module.exports.login = (req,res,next)=>{
    
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
  
    next()
}   
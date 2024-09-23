require("dotenv").config()
const User = require("../../models/users.model")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
// [POST] api/user/register
module.exports.register =async (req,res)=>{
    try{
        
       const {email,password,fullName} = req.body
        const emailExist = await User.findOne({
            email:email,
            deleted:false
        })
        
        if(emailExist){
            return res.json({
                code:400,
                message:"Email đã tồn tại"
            })
        }

        req.body.password = md5(req.body.password)


        const user = new User(req.body)
        await user.save()

        res.json({
            code:200,
            data:user
        })
        
        

        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}


//[POST] /api/user/login
module.exports.login = async(req,res)=>{
    try {
        req.body.password = md5(req.body.password)
        const user = await User.findOne({
            deleted:false,
            email:req.body.email
        })
        if(user){
            
            if(user.status!="active"){
                return res.json({
                    code:400,
                    message:"Tài khoản đã bị khóa"
                })
            }
            if(user.password!=req.body.password){
                return res.json({
                    code:400,
                    message:"Mật khẩu không chính xác"
                })
            }
         
            const payload= {
                fullName:user.fullName,
                email:user.email,
                
            }
        
            const user_token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE   
                }
            )
            
            return res.json({
                code:200,
                user_token:user_token
            })
        }
        else{
            return res.json({
                code:400,
                message:"Email không tồn tại"
            })
        }
        
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}


//[POST] /api/user/checkToken/:token
module.exports.checkToken = async(req,res)=>{
    try {
        const token = req.params.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        if(decoded){

            return res.json({
                code:200,
                token:token
            })
        }
        else{
            res.json({
                code:400,
                message:"token không hợp lệ"
            })
        }
       
        
    } catch (error) {
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
}

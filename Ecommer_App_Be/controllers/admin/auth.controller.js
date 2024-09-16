require("dotenv").config()
const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const md5=require("md5")
const jwt= require("jsonwebtoken")

//[POST] /api/admin/auth/login
module.exports.login = async(req,res)=>{
    try {
        req.body.password = md5(req.body.password)
        const account = await Account.findOne({
            deleted:false,
            email:req.body.email
        })
        if(account){
            if(account.status!="active"){
                return res.json({
                    code:400,
                    message:"Tài khoản đã bị khóa"
                })
            }
            if(account.password!=req.body.password){
                return res.json({
                    code:400,
                    message:"Mật khẩu không chính xác"
                })
            }
            const role = await Role.findOne({
                deleted:false,
                _id:account.role_id
            })
            const payload ={
                email:account.email,
                fullName:account.fullName,
                phone: account.phone,
                avatar: account.avatar,
                status: account.status,
                role: role
            }
            const access_token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE   
                }
            )
            return res.json({
                code:200,
                data:payload,
                access_token
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
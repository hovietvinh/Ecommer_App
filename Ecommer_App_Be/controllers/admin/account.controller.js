const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const md5 = require("md5")

//[GET] api/admin/accounts
module.exports.index = async(req,res)=>{
    try{

        let find= {
            deleted:false
        }


     
        const accounts = await Account.find(find).select("-password")

        
        const accountsWithRole = [];

        for (const account of accounts) {
            const role = await Role.findOne({
                deleted: false,
                _id: account.role_id
            });

            
            const accountWithRole = {
                ...account.toObject(), 
                role: role ? role.toObject() : null 
            };

            accountsWithRole.push(accountWithRole); 
        }
  

        res.json({
            code:200,
            data:accountsWithRole
        })

    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }


}


//[POST] api/admin/account/create
module.exports.create = async(req,res)=>{
    try{
       
        const emailExist = await Account.findOne({
            email:req.body.email,
            deleted:false
        })
        if(emailExist){
            res.json({
                code:400,
                message:"Email đã tồn tại"
            })
        }
        else{
            req.body.password = md5(req.body.password)
            const account = new Account(req.body)
            await account.save()
    
            res.json({
                code:200,
                message:"Tạo tài khoản thành công",
                data:account
            })
        }

        
    }catch(e){
        res.json({
            code:400,
            message:"Error in BE"
        })
    }
    
}
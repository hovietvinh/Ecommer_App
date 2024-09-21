const Cart = require("../models/cart.model")
module.exports.cardId=async(req,res,next)=>{
    if(!req.cookies.cardId){
        return res.json({
            code:400,
            message:"Loi cookie"
        })
    }else{
        
        const cart = await Cart.findOne({
            _id:req.cookies.cardId
        })
        if(!cart){
            return res.json({
                code:400,
                message:"Loi cookie123"
            })
        }


    }
    next()
}
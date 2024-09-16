module.exports.auth = (req,res,next)=>{
    // console.log(req.body);
    if(!req.body.email){
        res.json({
            code:400,
            message:"Yêu cầu phải có email"
        })
        return;
    }
    if(!req.body.password){
        res.json({
            code:400,
            message:"Yêu cầu phải có password"
        })
        return;
    }
    next()
}   
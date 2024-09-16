module.exports.titleProduct = (req,res,next)=>{
    // console.log(req.body);
    if(!req.body.title){
        res.json({
            code:400,
            message:"Yêu cầu phải có tiêu đề"
        })
        return;
    }
    next()
}   
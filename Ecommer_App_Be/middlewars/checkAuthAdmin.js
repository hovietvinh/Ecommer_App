require("dotenv").config()
const jwt = require("jsonwebtoken")
module.exports.checkAuthByAccessToken = (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        next()
    }
    else{
        return res.json({
            code:400,
            message:"Không có quyền truy cập"
        })
    }
    
};
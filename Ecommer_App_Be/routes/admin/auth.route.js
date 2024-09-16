const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller")
const validate = require("../../validates/admin/auth.validate")
const middleware = require("../../middlewars/checkAuthAdmin")


router.use((req, res, next) => {
    if (req.path === "/login" || req.path === "/checkAuth") {
        return next(); 
    }
    middleware.checkAuthByAccessToken(req, res, next); 
});


router.post("/login",validate.auth,controller.login)
router.post("/logout",validate.auth,controller.login)
router.post("/checkAuth",controller.checkAuth)




module.exports = router
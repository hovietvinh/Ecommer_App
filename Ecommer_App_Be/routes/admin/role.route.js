const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/role.controller")
const validate = require("../../validates/admin/product.validate")

router.get("/",controller.index) 
router.post("/create",validate.titleProduct,controller.create)
router.delete("/delete/:id",controller.delete)

router.get("/detail/:id",controller.detail)

router.patch("/permissions",controller.permissions)
router.patch("/edit/:id",controller.edit)


module.exports = router
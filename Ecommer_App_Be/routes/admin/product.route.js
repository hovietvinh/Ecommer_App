const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/",controller.index) 
router.patch("/change-status/:status/:id",controller.changeStatus) 
router.patch("/change-multi",controller.changeMulti)
router.delete("/delete/:id",controller.delete)
router.post("/create",validate.titleProduct,controller.create)
router.get("/detail/:id",controller.detail)
router.patch("/edit/:id",validate.titleProduct,controller.edit)

module.exports = router
const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller")
const validate = require("../../validates/admin/product.validate");

router.get("/",controller.index) 
router.get("/deleted",controller.deleted) 
router.post("/create",validate.titleProduct,controller.create)
router.get("/detail/:id",controller.detail)
router.patch("/edit/:id" ,validate.titleProduct,controller.edit)
router.delete("/delete/:id" ,controller.delete)
router.post("/deletedPermanently/:id",controller.deletedPermanently)
router.patch("/returnDeleted/:id",controller.returnDeleted)



module.exports = router
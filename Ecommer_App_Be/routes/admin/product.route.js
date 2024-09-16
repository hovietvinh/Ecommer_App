const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const uploadImageToCloudinary = require("../../middlewars/uploadImageToCloudinary")


router.get("/",controller.index) 
router.get("/deleted",controller.deleted) 
router.patch("/change-status/:status/:id",controller.changeStatus) 
router.patch("/change-multi",controller.changeMulti)
router.delete("/delete/:id",controller.delete)
router.post("/create",upload.single('thumbnail'), uploadImageToCloudinary,validate.titleProduct,controller.create)
router.get("/detail/:id",controller.detail)
router.patch("/edit/:id",upload.single('thumbnail'), uploadImageToCloudinary,validate.titleProduct,controller.edit)

router.post("/deletedPermanently/:id",controller.deletedPermanently)

module.exports = router
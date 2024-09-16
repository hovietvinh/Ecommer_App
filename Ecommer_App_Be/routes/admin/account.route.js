const express = require("express")
const router = express.Router();
const multer = require('multer');
const upload = multer()
const controller = require("../../controllers/admin/account.controller")
const validate = require("../../validates/admin/account.validate")

router.post("/create",upload.single('avatar'),validate.account,controller.create)
router.get("/",controller.index)



module.exports = router
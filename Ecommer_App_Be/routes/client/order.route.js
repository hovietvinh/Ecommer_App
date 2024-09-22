const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/order.controller")


router.get("/",controller.index) 
router.get("/success/:orderId",controller.success) 
router.post("/order",controller.order) 

module.exports = router
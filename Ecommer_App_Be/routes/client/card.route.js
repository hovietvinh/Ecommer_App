const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/cart.controller")
const cartMiddleware = require("../../middlewars/cart.middleware")

router.get("/create",controller.create) 
router.get("/delete/:id",cartMiddleware.cardId,controller.delete) 
router.get("/",cartMiddleware.cardId,controller.index) 
router.get("/update/:productId/:quantity",cartMiddleware.cardId,controller.update) 
router.post("/add/:productId",cartMiddleware.cardId,controller.add) 


module.exports = router
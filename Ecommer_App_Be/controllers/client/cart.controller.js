const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
// [GET] api/card/create
module.exports.create = async(req,res)=>{
    try {
        const cart  = new Cart()
        // console.log(card._id+" controller" );
        await cart.save()
        res.json({
            code:200,
            cardId:cart._id
        })
    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}
// [GET] api/card
module.exports.index = async(req,res)=>{
    try {
        const cart = await Cart.findOne({
            _id:req.cookies.cardId
        })
        let cartObject = cart.toObject()

        let productsObject =[]

        if(cart.products.length>0){
            for(const item of cart.products){
                const productId = item.product_id
                const productInfoModel = await Product.findOne({
                    deleted:false,
                    status:"active",
                    _id:productId
                })
                let productInfo = productInfoModel.toObject()
                productInfo.quantity = item.quantity
                productsObject.push(productInfo)
            }
        }
        cartObject.productsObject=productsObject

        res.json({
            code:200,
            cart:cartObject
        })
    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}
// [POST] /api/card/add/:productId
module.exports.add = async(req,res)=>{
    try {
        const {productId} = req.params
        const {quantity} = req.body

        const objectCart = {
            product_id:productId,
            quantity:parseInt(quantity)
        }
        const cart = await Cart.findOne({
            _id:req.cookies.cardId
        })

        const existProduct = cart.products.find(item=>item.product_id == productId)

        if(existProduct){
            const newQuantity = parseInt(existProduct.quantity) + parseInt(quantity)
            
            await Cart.updateOne(
            {
                _id:req.cookies.cardId,
                "products.product_id":productId
            },
            {
                'products.$.quantity':parseInt(newQuantity)
            })
        }
        else{
            await Cart.updateOne({_id:req.cookies.cardId},
                {
                    $push:{products:objectCart}
                })
        }
        
        

        res.json({
            code:200, 
            message:"Thêm vào giỏ hàng thành công"
        })


    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}
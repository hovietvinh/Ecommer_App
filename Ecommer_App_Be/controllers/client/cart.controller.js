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

// [GET] api/card/update/:productId/:quantity
module.exports.update = async(req,res)=>{
    try {
   
        const {productId,quantity} = req.params
        const cartId = req.cookies.cardId
        await Cart.updateOne({
            _id:cartId,
            "products.product_id":productId
        },{
            'products.$.quantity':parseInt(quantity)
        })
        res.json({
            code:200,
            message:"Cập nhật thành cong"
        })
    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}
// [GET] api/card/delete/:id
module.exports.delete = async(req,res)=>{
    try {
        const {id} = req.params
        const cartId = req.cookies.cardId
        await Cart.updateOne({_id:cartId},{
            "$pull":{"products":{"product_id":id}}
        })
        res.json({
            code:200,
            message:"Xóa thành công"
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
        let total =0

        if(cart.products.length>0){
            for(const item of cart.products){
                total += item.quantity
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
        cartObject.total = total

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
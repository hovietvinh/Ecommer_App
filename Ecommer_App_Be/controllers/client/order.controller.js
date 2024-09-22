const Cart = require("../../models/cart.model") 
const Order = require("../../models/order.model")
const Product = require("../../models/product.model")
// [GET] api/checkout
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
                if (productInfoModel.stock >= item.quantity){
                    let productInfo = productInfoModel.toObject()
                    productInfo.quantity = item.quantity
                    productsObject.push(productInfo)
                }
                else{
                    return res.json({
                        code:400,
                        message:"Không đủ số lượng sản phẩm"
                    })
                }
                
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

// [GET] api/checkout/order
module.exports.order = async(req,res)=>{
    try {
        const {fullName,phone,address,products} =req.body
        // console.log(fullName,phone,address);
        const cartId = req.cookies.cardId
        const userInfo ={
            fullName:fullName,
            phone:phone,
            address:address
        }
        // console.log(userInfo);

        let productsData = []
        for(const product of products){
            
            const objectProduct = {
                product_id:product._id,
                quantity:product.quantity,
                price:product.price,
                discountPercentage: product.discountPercentage
            }
            productsData.push(objectProduct)
        }
        // console.log(productsData);
        // console.log(cartId);

        const objectOrder = {
            cart_id:cartId,
            userInfo:userInfo,
            products:productsData
        } 


        const order = new Order(objectOrder)
        await order.save()
        // console.log(order);

        await Cart.updateOne({_id:cartId},{
            products:[]
        })

        for(const product of products){
            await Product.updateOne(
                { _id: product._id },
                { $inc: { stock: -product.quantity } }
            );
        }

        res.json({
            code:200,
            orderId:order._id
        })



    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}


// [GET] api/checkout/success/:orderId
module.exports.success = async(req,res)=>{
    
    try {
        const getPriceNew = (price,discount)=>{
            return (price - price*discount/100).toFixed(0);
        }
        const {orderId} = req.params
        // console.log(orderId);
        const order = await Order.findOne({
            _id:orderId
        })
        // console.log(order);
        let products = []
        for(const product of order.products){
            
            const productInfo = await Product.findOne({
                _id:product.product_id
            }).select("title thumbnail")
            if(productInfo){
                let productObject = productInfo.toObject()
                productObject.priceNew = getPriceNew(product.price,product.discountPercentage)
                productObject.totalPrice = productObject.priceNew * product.quantity
                productObject.quantity = product.quantity
                products.push(productObject)
            }
        }
        let orderObject = order.toObject()
        orderObject.productsInfo = products
        orderObject.totalPrice = products.reduce((sum,record)=>sum+record.totalPrice,0)
        res.json({
            code:200,
            order:orderObject
        })
    } catch (error) {
        res.json({
            code:400, 
            message:error.message
        })
    }
}
const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")
const productCategoryRoutes = require("./product-category.route")
const searchRoutes = require("./search.route")
const carthRoutes = require("./card.route")
const cartMiddleware = require("../../middlewars/cart.middleware")
const Cart = require("../../models/cart.model")

module.exports = (app)=>{
    app.use((req, res, next) => {
        // Kiểm tra nếu đường dẫn không phải là /api/cart
        if (!req.path.startsWith('/api/cart')) {
            cartMiddleware.cardId(req, res, next);
        } else {
            next(); // Nếu là /api/cart, bỏ qua middleware
        }
    });
    app.use("/api",homeRoutes)
    app.use("/api/products",productRoutes)
    app.use("/api/products-category",productCategoryRoutes)
    app.use("/api/search",searchRoutes)
    app.use("/api/cart",carthRoutes)

    // app.get("/api/dele",async(req,res)=>{
    //     const result = await Cart.deleteMany({});
    //     res.send(123)
    // })
}

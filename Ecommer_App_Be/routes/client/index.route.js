const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")

module.exports = (app)=>{
    app.use("/api",homeRoutes)
    app.use("/api/products",productRoutes)
}

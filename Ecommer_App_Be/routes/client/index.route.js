const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")
const productCategoryRoutes = require("./product-category.route")
const searchRoutes = require("./search.route")

module.exports = (app)=>{
    app.use("/api",homeRoutes)
    app.use("/api/products",productRoutes)
    app.use("/api/products-category",productCategoryRoutes)
    app.use("/api/search",searchRoutes)
}

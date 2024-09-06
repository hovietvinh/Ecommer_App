const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")

module.exports = (app)=>{
    app.use("/api/admin/dashboard",dashboardRoutes)
    app.use("/api/admin/products",productRoutes)
}

const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const authRoutes = require("./auth.route")
const middleware = require("../../middlewars/checkAuthAdmin")

module.exports = (app)=>{

    app.use((req, res, next) => {
        if (req.path.startsWith("/api/admin/auth")) {
            return next(); 
        }
        middleware.checkAuthByAccessToken(req, res, next);
    });
    app.use("/api/admin/dashboard",dashboardRoutes)
    app.use("/api/admin/products",productRoutes)
    app.use("/api/admin/products-category",productCategoryRoutes)
    app.use("/api/admin/roles",roleRoutes)
    app.use("/api/admin/accounts",accountRoutes)
    app.use("/api/admin/auth",authRoutes)
}

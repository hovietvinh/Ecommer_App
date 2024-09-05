const dashboardRoutes = require("./dashboard.route")

module.exports = (app)=>{
    app.use("/api/admin/dashboard",dashboardRoutes)
}

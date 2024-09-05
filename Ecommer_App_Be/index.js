const express = require('express')
require("dotenv").config()
const clientRoutes = require("./routes/client/index.route") // import client routes
const app = express()
const port = process.env.PORT

//Routes
clientRoutes(app)

app.listen(port)
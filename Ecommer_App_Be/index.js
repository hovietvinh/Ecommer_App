const express = require('express')
require("dotenv").config()
const cors = require("cors"); // import cors
const bodyParser = require('body-parser'); // import body-parser
const clientRoutes = require("./routes/client/index.route") // import client routes
const adminRoutes = require("./routes/admin/index.route") // import admin routes

//Connect db mongoose
const database = require("./config/database")
database.connect();



const app = express()
const port = process.env.PORT

const cookieParser = require('cookie-parser');
app.use(cookieParser());
//fix cors fe
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent across origins
}))

// body-parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
clientRoutes(app)
adminRoutes(app)


app.listen(port)
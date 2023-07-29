require("dotenv").config()
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import logRequests  from "./middleware/logRequests"
import authRoutes from "./routes/authRoutes"
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")
const expenseRoutes = require("./routes/expenseRoutes")

var app = express()
var cors = require("cors")


var corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3002"],
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())




app.use("/hi", (req, res) => {
  res.send("Hello World!")
})
app.use("/auth",  authRoutes)
app.use("/user", userRoutes)
app.use("/car", carRoutes)
app.use("/expense", expenseRoutes)

app.listen(3001, function () {
  console.log("Server running on port 3001")
})

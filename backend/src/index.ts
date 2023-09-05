require("dotenv").config()
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes"
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const statsRoutes = require("./routes/statsRoutes")
const resourceRoutes = require("./routes/resourceRoutes")

const PORT = process.env.PORT || 3001
var app = express()
var cors = require("cors")

var corsOptions = {
  origin: [process.env.WEBSERVER_HOST],
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/hi", (req, res) => {
  res.send("Hello World!")
})
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/car", carRoutes)
app.use("/expense", expenseRoutes)
app.use("/stats", statsRoutes)
app.use("/resources", resourceRoutes)

app.listen(PORT, function () {
  console.log("Server running on port " + PORT)
})

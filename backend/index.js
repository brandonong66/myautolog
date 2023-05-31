require("dotenv").config()
var express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

var app = express()
var cors = require("cors")

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())


const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")
const expenseRoutes = require('./routes/expenseRoutes')

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/car", carRoutes)
app.use("/expense", expenseRoutes)


app.listen(3001, function () {
  console.log("Server running on port 3001")
})


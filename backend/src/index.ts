require("dotenv").config()
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

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

// Middleware to log all requests
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.url}, Body: `, req.body)
//   const oldWrite = res.write
//   const oldEnd = res.end
//   const chunks = []
//   res.write = (...restArgs) => {
//     chunks.push(Buffer.from(restArgs[0]))
//     oldWrite.apply(res, restArgs)
//   }
//   res.end = (...restArgs) => {
//     if (restArgs[0]) {
//       chunks.push(Buffer.from(restArgs[0]))
//     }
//     const body = Buffer.concat(chunks).toString("utf8")
//     console.log(`Response: ${res.statusCode}, Body: `, body)
//     oldEnd.apply(res, restArgs)
//   }
//   next()
// })


app.use("/hi", (req, res) => {
  res.send("Hello World!")
})
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/car", carRoutes)
app.use("/expense", expenseRoutes)

app.listen(3001, function () {
  console.log("Server running on port 3001")
})

require("dotenv").config()
var express = require("express")
const bodyParser = require("body-parser")
var app = express()
var cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./data/.testdb")
const corsAuthMiddleware = require("./middleware/corsAuthMiddleware")

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
app.use("/auth", corsAuthMiddleware, authRoutes)
app.use("/user", userRoutes)

app.listen(3001, function () {
  console.log("Server running on port 3001")
})

app.get("/expenses", (req, res) => {
  db.all(
    "SELECT storeOrderId, orderDate, source, itemId, itemName, itemBrand, partNumber, price, itemTax FROM `Order` NATURAL JOIN OrderLineItem NATURAL JOIN Item;",
    function (err, rows) {
      if (err) {
        console.error(err.message)
        res.status(500).json({ error: "Internal Server Error" })
      } else {
        res.json(rows)
      }
    }
  )
})

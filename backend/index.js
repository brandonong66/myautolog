var express = require("express")
var app = express()
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./data/.testdb")

app.listen(3001, function () {
  console.log("Server running on port 3000")
})

app.get("/expenses", (req, res) => {
  db.all(
    "SELECT storeOrderId, source, itemName, itemBrand, partNumber, price FROM `Order` NATURAL JOIN OrderLineItem NATURAL JOIN Item;",
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

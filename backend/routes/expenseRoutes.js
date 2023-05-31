const express = require("express")
const router = express.Router()
const authenticateToken = require("../middleware/authenticateToken")
const dbConnectionPool = require("../utilities/db")

router.get("/getExpenses", authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      res.status(422).json({ error: "bad login token" })
    } else {
      const query =
        "SELECT `Order`.storeOrderId, `Order`.orderDate, `Order`.source, `Order`.url, Item.itemId, Item.itemName, Item.itemBrand, Item.partNumber, Item.notes, Item.quantity, Item.price, Item.itemTax, CASE WHEN Car.userLabel IS NULL OR Car.userLabel = '' THEN CONCAT(Car.year, ' ', Car.make, ' ', Car.model) ELSE Car.userLabel END AS car FROM `Order` JOIN Item on Item.orderId = `Order`.orderId JOIN Car ON Car.carId = Item.carId WHERE `Order`.userId = ?;"
      const queryValues = [req.userId]

      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(query, queryValues)
      return res.json(rows)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get("/getOrders", authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      res.status(422).json({ error: "bad login token" })
    } else {
      const query =
        "SELECT orderId, storeOrderId, source, url, orderDate, expectedArrivalDate, subtotalPrice, orderTax, shippingPrice, totalPrice FROM `Order` WHERE userId = ?;"
      const queryValues = [req.userId]

      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(query, queryValues)
      return res.json(rows)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
module.exports = router

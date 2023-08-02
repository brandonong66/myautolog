import express from "express"
import authenticateToken from "../middleware/authenticateToken"
import { dbConnectionPool } from "../utilities/db"
import { AuthenticatedRequest } from "../types"

const router = express.Router()
router.get(
  "/getExpenses",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "SELECT `Order`.storeOrderId, `Order`.orderDate, `Order`.source, `Order`.url, Item.itemId, Item.itemName, Item.category, Item.itemBrand, Item.partNumber, Item.notes, Item.quantity, Item.price, Item.itemTax, Car.userLabel FROM `Order` JOIN Item on Item.orderId = `Order`.orderId LEFT JOIN Car ON Car.carId = Item.carId WHERE `Order`.userId = ? ORDER BY `Order`.orderDate DESC;"
          //left join car on car.carId = item.carId because not all items have a carId
        const queryValues = [req.userId]

        const [rows, fields] = await dbConnectionPool.query(query, queryValues)
        return res.json(rows)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.get(
  "/getOrders",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "SELECT orderId, storeOrderId, source, url, orderDate, subtotalPrice, orderTax, shippingPrice, totalPrice FROM `Order` WHERE userId = ?;"
        const queryValues = [req.userId]

        const [rows, fields] = await dbConnectionPool.query(query, queryValues)
        return res.json(rows)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.post(
  "/submitOrder",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const orderQuery =
          "INSERT INTO `Order` (userId, storeOrderId, source, url, orderDate, subtotalPrice, orderTax, shippingPrice, totalPrice) VALUES (?,?,?,?,?,?,?,?,?);"
        const orderValues = [
          req.userId,
          req.body.order.storeOrderId,
          req.body.order.source,
          req.body.order.url,
          req.body.order.orderDate.substring(0, 10), // YYYY-MM-DD
          req.body.order.subtotalPrice,
          req.body.order.orderTax,
          req.body.order.shippingPrice,
          req.body.order.totalPrice,
        ]

        const itemsQuery =
          "INSERT INTO Item (orderId, carId, itemName, itemBrand, partNumber, notes, category, price, itemTax, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

        dbConnectionPool.getConnection().then(async (connection) => {
          try {
            await connection.beginTransaction()

            const orderQueryResult = await connection.query(
              orderQuery,
              orderValues
            )
            const lastInsertId = orderQueryResult[0].insertId 

            let itemsQueryResult = []

            for (const item of req.body.items) {
              const itemResult = connection.query(itemsQuery, [
                lastInsertId,
                (item.carId == 0 ? null : item.carId),
                item.itemName,
                item.itemBrand,
                item.partNumber,
                item.notes,
                item.category,
                item.price,
                item.itemTax,
                item.quantity,
              ])
              itemsQueryResult.push(itemResult)
            }

            connection.commit().then(() => {
              res.json({
                orderResult: orderQueryResult,
                itemsResult: itemsQueryResult,
              })
            })
          } catch (error) {
            console.log(error.message)
            connection.rollback()
            res.status(500).json({ error: "Internal Server Error" })
            throw error // rethrow error so it can be caught by the catch block below
          } finally {
            connection.release()
          }
        })
      }
    } catch (error) {
      console.log(error.message)

      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
module.exports = router

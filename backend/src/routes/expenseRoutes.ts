import express from "express"
import authenticateToken from "../middleware/authenticateToken"
import { dbConnectionPool } from "../utilities/db"
import { AuthenticatedRequest } from "../types/requests"
import { Field, FieldPacket, OkPacket, RowDataPacket } from "mysql2/promise"
import { ItemType } from "../types/expenses"

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
          "SELECT `Order`.orderId, `Order`.storeOrderId, `Order`.orderDate, `Order`.source, `Order`.url, Item.itemId, Item.itemName, Item.category, Item.itemBrand, Item.partNumber, Item.notes, Item.quantity, Item.price, Item.itemTax, Car.userLabel FROM `Order` JOIN Item on Item.orderId = `Order`.orderId LEFT JOIN Car ON Car.carId = Item.carId WHERE `Order`.userId = ? ORDER BY `Order`.orderDate DESC;"
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
          "SELECT orderId, storeOrderId, source, url, orderDate, subtotalPrice, orderTax, shippingPrice, totalPrice FROM `Order` WHERE userId = ? ORDER BY `Order`.orderDate DESC;"
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
    if (!req.userId) {
      return res.status(422).json({ error: "bad login token" })
    }

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

    const connection = await dbConnectionPool.getConnection()

    try {
      await connection.beginTransaction()

      const [orderQueryResult, _]: [OkPacket, FieldPacket[]] =
        await connection.query(orderQuery, orderValues)
      const lastInsertId = orderQueryResult.insertId

      const itemsPromises = req.body.items.map((item) => {
        return connection.query(itemsQuery, [
          lastInsertId,
          item.carId == 0 ? null : item.carId,
          item.itemName,
          item.itemBrand,
          item.partNumber,
          item.notes,
          item.category,
          item.price,
          item.itemTax,
          item.quantity,
        ])
      })

      const itemsQueryResult = await Promise.all(itemsPromises)

      await connection.commit()

      res.json({
        orderResult: orderQueryResult,
        itemsResult: itemsQueryResult,
      })
    } catch (error) {
      console.error(error)
      await connection.rollback()

      if (error.code === "ER_DUP_ENTRY") {
        res.status(409).json({ error: "Error: Duplicate Order Id" })
      } else {
        res.status(500).json({ error: "Error: Internal Server Error" })
      }
    } finally {
      connection.release()
    }
  }
)

router.delete(
  "/deleteOrder",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    if (!req.userId) {
      return res.status(422).json({ error: "bad login token" })
    }

    const deleteItemsQuery = "DELETE FROM Item WHERE orderId = ?;"
    const deleteItemsArgs = [req.query.orderId]

    const deleteOrderQuery =
      "DELETE FROM `Order` WHERE orderId = ? AND userId = ?;"
    const deleteArgs = [req.query.orderId, req.userId]

    const connection = await dbConnectionPool.getConnection()

    try {
      await connection.beginTransaction()

      const [deleteItemsResult, _]: [OkPacket, FieldPacket[]] =
        await connection.query(deleteItemsQuery, deleteItemsArgs)
      const [deleteOrderResult, __]: [OkPacket, FieldPacket[]] =
        await connection.query(deleteOrderQuery, deleteArgs)

      await connection.commit()
      res.json({
        deleteItemsResult: deleteItemsResult,
        deleteOrderResult: deleteOrderResult,
      })
    } catch (error) {
      await connection.rollback()
      console.error(error)
      res.status(500).json({ error: "Error: Internal Server Error" })
    } finally {
      connection.release()
    }
  }
)

router.get(
  "/getOrderItems",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "select itemName, itemBrand, partNumber, notes, price, itemTax, quantity, category, carId from Item join `Order` on Item.orderId = `Order`.orderId where `Order`.orderId = ? AND `Order`.userId = ?;"
        const queryArgs = [req.query.orderId, req.userId]
        const [rows, fields] = await dbConnectionPool.query(query, queryArgs)

        if (Array.isArray(rows)) {
          if (rows.length > 0) {
            return res.json(rows)
          } else {
            throw new Error("Order not found")
          }
        } else {
          throw new Error("Unexpected return type from database query")
        }
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.get(
  "/getAllOrderItems",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(422).json({ error: "bad login token" })
      }
      const query =
        "select `Order`.storeOrderId, itemName, itemBrand, partNumber, notes, price, itemTax, quantity, category, carId from Item join `Order` on Item.orderId = `Order`.orderId where `Order`.userId = ?;"
      const queryArgs = [req.userId]
      const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
        await dbConnectionPool.query(query, queryArgs)

      if (Array.isArray(rows)) {
        if (rows.length > 0) {
          let orderItems = {}
          rows.forEach((row) => {
            const item: ItemType = {
              itemName: row.itemName,
              itemBrand: row.itemBrand,
              partNumber: row.partNumber,
              notes: row.notes,
              price: row.price,
              itemTax: row.itemTax,
              quantity: row.quantity,
              category: row.category,
              carId: row.carId,
            }
            const key = `${row.storeOrderId}`
            if (orderItems.hasOwnProperty(key)) {
              orderItems[key].push(item)
            } else {
              orderItems[key] = [item]
            }
          })

          return res.json(orderItems)
        } else {
          throw new Error("Order items not found")
        }
      } else {
        throw new Error("Unexpected return type from database query")
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
module.exports = router

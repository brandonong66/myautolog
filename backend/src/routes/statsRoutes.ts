import express from "express"
import authenticateToken from "../middleware/authenticateToken"
import { dbConnectionPool } from "../utilities/db"

// types
import { AuthenticatedRequest } from "../types/requests"
import { FieldPacket, RowDataPacket } from "mysql2/promise"
import { MonthlySpendingType } from "../types/stats"

const router = express.Router()

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

router.get(
  "/monthlySpending",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "select orderId, orderDate, totalPrice from `Order` where userId = ?  AND (YEAR(orderDate) = YEAR(CURDATE()) OR YEAR(orderDate) = YEAR(CURDATE()) - 1) order by orderDate asc;"
        const queryValues = [req.userId]
        const [queryResult, _]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        let monthlySpending: MonthlySpendingType = {}

        const currentYear = new Date().getFullYear()

        // step 1: initialize monthlySpending object with all years and months
        for (let y = currentYear - 1; y <= currentYear; y++) {
          monthlySpending[y] = {}
          for (let m = 0; m < MONTHS.length; m++) {
            monthlySpending[y][MONTHS[m]] = 0
          }
        }

        // step 2: iterate through queryResult and add totalPrice to monthlySpending
        for (let i = 0; i < queryResult.length; i++) {
          const order = queryResult[i]
          const orderDate = new Date(order.orderDate)
          const orderYear = orderDate.getFullYear()
          const orderMonth = MONTHS[orderDate.getMonth()]
          const orderTotalPrice = order.totalPrice

          // only want this year and last year
          if (orderYear === currentYear || orderYear === currentYear - 1)
            monthlySpending[orderYear] = {
              ...monthlySpending[orderYear],
              [orderMonth]:
                (monthlySpending[orderYear]?.[orderMonth] || 0) +
                orderTotalPrice,
            }
        }

        res.json(monthlySpending)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.get(
  "/carSpending",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "select Car.userLabel, SUM(Item.price) as total_spending from Item left join Car on Item.carId = Car.carId where Item.userId = ? GROUP BY Car.userLabel;"
        const queryValues = [req.userId]
        const [queryResult, _]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        res.json(queryResult)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.get(
  "/categorySpending",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "select category, SUM(Item.price) as total_spending from Item where Item.userId = ? GROUP BY category;"
        const queryValues = [req.userId]
        const [queryResult, _]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        res.json(queryResult)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.get(
  "/topSources",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "SELECT `source`, SUM(totalPrice) as totalSpent FROM `Order` WHERE userId = ? GROUP BY `source` ORDER BY totalSpent DESC LIMIT 3;"
        const queryValues = [req.userId]
        const [queryResult, _]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        res.json(queryResult)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
module.exports = router

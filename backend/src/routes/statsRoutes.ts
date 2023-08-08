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
          "select orderId, orderDate, totalPrice from `Order` where userId = ? order by orderDate asc;"
        const queryValues = [req.userId]
        const [queryResult, _]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        let monthlySpending: MonthlySpendingType = {}

        // step 1: get the year of first order (oldest)
        const firstOrderYear = new Date(queryResult[0].orderDate).getFullYear()

        // step 2: get the year of last order (newest)
        const lastOrderYear = new Date(
          queryResult[queryResult.length - 1].orderDate
        ).getFullYear()

        // step 3: initialize monthlySpending object with all years and months
        for (let y = firstOrderYear; y <= lastOrderYear; y++) {
          monthlySpending[y] = {}
          for (let m = 0; m < MONTHS.length; m++) {
            monthlySpending[y][MONTHS[m]] = 0
          }
        }

        // step 3: iterate through queryResult and add totalPrice to monthlySpending
        for (let i = 0; i < queryResult.length; i++) {
          const order = queryResult[i]
          const orderDate = new Date(order.orderDate)
          const orderYear = orderDate.getFullYear()
          const orderMonth = MONTHS[orderDate.getMonth()]
          const orderTotalPrice = order.totalPrice

          monthlySpending[orderYear] = {
            ...monthlySpending[orderYear],
            [orderMonth]:
              (monthlySpending[orderYear]?.[orderMonth] || 0) + orderTotalPrice,
          }
        }

        res.json({ monthlySpending })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

module.exports = router

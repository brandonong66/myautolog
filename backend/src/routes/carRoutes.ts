import express from "express"
import authenticateToken from "../middleware/authenticateToken"
import { dbConnectionPool } from "../utilities/db"
import { AuthenticatedRequest } from "../types/requests"
const router = express.Router()

router.get(
  "/getCars",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query = "SELECT * FROM Car WHERE userId = ?"
        const queryValues = [req.userId]

        const [rows, fields] = await dbConnectionPool.query(query, queryValues)

        // remove "None" car
        // let cars = rows.filter((car) => car.userLabel !== "None")

        return res.json(rows)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.post(
  "/add",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.body.year) {
        res.status(422).json({ error: "Missing year" })
      } else if (!req.body.make) {
        res.status(422).json({ error: "Missing make" })
      } else if (!req.body.model) {
        res.status(422).json({ error: "Missing model" })
      } else {
        let userLabel = req.body.userLabel
        if (!req.body.userLabel) {
          userLabel = req.body.year + " " + req.body.make + " " + req.body.model
        }
        const query =
          "INSERT INTO Car (userId, userLabel, year, make, model, color, vin, licensePlate, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const queryValues = [
          req.userId,
          userLabel,
          req.body.year,
          req.body.make,
          req.body.model,
          req.body.color,
          req.body.vin,
          req.body.licensePlate,
          req.body.notes,
        ]
        const [rows, fields] = await dbConnectionPool.query(query, queryValues)
        return res.json({ message: "Car added" })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
router.put(
  "/update",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.body.carId) {
        res.status(422).json({ error: "Missing carId" })
      } else {
        const query =
          "UPDATE Car SET userLabel = ?, year = ?, make = ?, model = ?, color = ?,  vin = ?, licensePlate = ?, notes = ? WHERE carId = ?"
        const queryValues = [
          req.body.userLabel,
          req.body.year,
          req.body.make,
          req.body.model,
          req.body.color,
          req.body.vin,
          req.body.licensePlate,
          req.body.notes,
          req.body.carId,
        ]
        const [rows, fields] = await dbConnectionPool.query(query, queryValues)
        return res.json({ message: "Car updated" })
      }
    } catch (error) {
      if (error.code === "ER_DATA_TOO_LONG") {
        res.status(422).json({ error: "Data too long" })
      } else {
        console.error(error.message)
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
)

router.delete(
  "/delete",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.query.carId) {
        res.status(422).json({ error: "Missing carId" })
      } else {
        const query = "DELETE FROM Car WHERE carId = ? AND userId = ?"
        const queryValues = [req.query.carId, req.userId]
        const [rows, fields] = await dbConnectionPool.query(query, queryValues)
        return res.json({ message: "Car deleted" })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
module.exports = router

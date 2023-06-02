const express = require("express")
const router = express.Router()
const authenticateToken = require("../middleware/authenticateToken")
const dbConnectionPool = require("../utilities/db")

router.get("/getCars", authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      res.status(422).json({ error: "bad login token" })
    } else {
      const query = "SELECT * FROM Car WHERE userId = ?"
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

router.post("/add", authenticateToken, async (req, res) => {
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
      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(query, queryValues)
      return res.json({ message: "Car added" })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
router.put("/update", authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      res.status(422).json({ error: "bad login token" })
    } else if (!req.body.carId) {
      res.status(422).json({ error: "Missing carId" })
    } else {
      const query =
        "UPDATE Car SET userLabel = ?, year = ?, make = ?, model = ?, vin = ?, licensePlate = ?, notes = ? WHERE carId = ?"
      const queryValues = [
        req.body.userLabel,
        req.body.year,
        req.body.make,
        req.body.model,
        req.body.vin,
        req.body.licensePlate,
        req.body.notes,
        req.body.carId,
      ]
      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(query, queryValues)
      return res.json({ message: "Car updated" })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
module.exports = router

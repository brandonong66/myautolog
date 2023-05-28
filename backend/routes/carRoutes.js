const express = require("express")
const router = express.Router()
const mysql = require("mysql2")
const authenticateToken = require("../middleware/authenticateToken")

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "myautolog",
})

db.connect((err) => {
  if (err) {
    console.log("Error connecrting to the database: ", err)
  } else {
    console.log("MySQL connected")
  }
})

router.get("/getCars", authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      res.status(422).json({ error: "bad login token" })
    } else {
      const query = "SELECT * FROM Car WHERE userId = ?"
      const queryValues = [req.userId]

      db.query(query, queryValues, (err, result) => {
        if (err) {
          res.status(500).json({ err: err.message })
        } else {
          res.json(result)
        }
      })
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
      const query =
        "INSERT INTO Car (userId, userLabel, year, make, model, vin, notes) VALUES (?, ?, ?, ?, ?, ?, ?)"
      const queryValues = [
        req.userId,
        req.body.userLabel,
        req.body.year,
        req.body.make,
        req.body.model,
        req.body.vin,
        req.body.notes,
      ]

      db.query(query, queryValues, (err, result) => {
        if (err) {
          res.status(500).json({ err: err.message })
        } else {
          res.json({ message: "Car added" })
        }
      })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = router

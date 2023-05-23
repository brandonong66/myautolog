
const express = require("express")
const router = express.Router()
const mysql = require("mysql2")
const bcrypt = require("bcrypt")

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

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).json({ error: "Bad Request: missing email" })
    } else if (!req.body.password) {
      res.status(400).json({ error: "Bad Request: missing password" })
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const query = "INSERT INTO User (email, password) VALUES (?, ?)"
      const queryValues = [req.body.email, hashedPassword]

      db.query(query, queryValues, (err, result) => {
        if (err) {
          // duplicate email
          if (err.code === "ER_DUP_ENTRY") {
            res.status(422).json({ error: "Email already in use" })
          }
          // all other errors
          else {
            console.error(err.message)
            res.status(500).json({ error: "Internal Server Error" })
          }
        }
        // success
        else {
          res.json({ message: "User created" })
        }
      })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = router

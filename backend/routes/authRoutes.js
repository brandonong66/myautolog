const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mysql = require("mysql2")

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

router.post("/login", (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Bad Request: missing email" })
  } else if (!req.body.password) {
    res.status(400).json({ error: "Bad Request: missing password" })
  } else {
    const { email, password } = req.body
    const userQuery = "SELECT * FROM User WHERE email = ?"
    const userQueryValues = [email]

    db.query(userQuery, userQueryValues, async (err, result) => {
      if (err) {
        console.error(err.message)
        res.status(500).json({ error: "Internal Server Error" })
      } else if (result.length === 0) {
        res.status(401).json({ error: "Invalid email or password" })
      } else {
        const user = result[0]
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          const payload = { userId: user.userId }
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          })
          res.cookie("accessToken", accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
          })
          res.json({ message: "Login successful" })
        } else {
          res.status(401).json({ error: "Invalid email or password" })
        }
      }
    })
  }
})

module.exports = router

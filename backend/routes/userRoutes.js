const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const dbConnectionPool = require("../utilities/db")

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

      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(query, queryValues)
      return res.json({ message: "User created" })
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(422).json({ error: "Email already in use" })
    } else {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
})

module.exports = router

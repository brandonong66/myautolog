const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dbConnectionPool = require("../utilities/db")

const EXPIRE_TIME = {
  jwt: "1h",
  cookie: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
}
router.post("/login", async (req, res) => {
  try {
    // check inputs
    if (!req.body.email) {
      res.status(400).json({ error: "Bad Request: missing email" })
    } else if (!req.body.password) {
      res.status(400).json({ error: "Bad Request: missing password" })
    } else {
      // get user from db
      const { email, password } = req.body
      const userQuery = "SELECT * FROM User WHERE email = ?"
      const userQueryValues = [email]

      const [rows, fields] = await dbConnectionPool
        .promise()
        .query(userQuery, userQueryValues)

      // does user with specified email exist?
      if (!rows.length) {
        return res.status(401).json({ error: "Invalid email or password" })
      }

      const user = rows[0]

      // verify password hash
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const payload = { userId: user.userId }

        // set auth token cookie (for auth purposes, secure)
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: EXPIRE_TIME.jwt,
        })
        res.cookie("authToken", authToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: EXPIRE_TIME.cookie,
        })

        // set clientAuthToken cookie (for frontend use, not secure)
        const clientAuthToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        res.cookie("clientAuthToken", clientAuthToken, {
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          expires: EXPIRE_TIME.cookie,
        })

        res.json({ message: "Login successful" })
      }

      // if password match fails
      else {
        res.status(401).json({ error: "Invalid email or password" })
      }
    }
  } catch (error) {
    console.log(error)
    console.error(error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.post("/logout", async (req, res) => {
  try {
    res.cookie("authToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    res.cookie("clientAuthToken", "", {
      expires: new Date(0),
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    })
    res.json({message: "Logout successful"})
  } catch (error) {
    console.log(error)
    console.error(error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})
module.exports = router

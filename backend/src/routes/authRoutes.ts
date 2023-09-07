import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { dbConnectionPool } from "../utilities/db"
import logRequests from "../middleware/logRequests"

const router = express.Router()

const JWT_EXPIRE_TIME = "24h"
const COOKIE_EXPIRE_TIME = 24 * 60 * 60 * 1000 // 24 * 60 * 60 * 1000 = 24 hrs

router.post("/login", logRequests, async (req, res) => {
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

      const [rows, fields] = await dbConnectionPool.query(
        userQuery,
        userQueryValues
      )

      // does user with specified email exist?
      if (Array.isArray(rows) && rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" })
      }

      const user = rows[0]

      // verify password hash
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const payload = { userId: user.userId }

        // set auth token cookie (for auth purposes, secure)
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: JWT_EXPIRE_TIME,
        })
        res.cookie("authToken", authToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          domain: '.myautolog.io',
          expires: new Date(Date.now() + COOKIE_EXPIRE_TIME),
        })

        // set clientAuthToken cookie (for frontend use, not secure)
        const clientAuthToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        res.cookie("clientAuthToken", clientAuthToken, {
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          domain: '.myautolog.io',
          expires: new Date(Date.now() + COOKIE_EXPIRE_TIME),
        })
        console.log(authToken)
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
      domain: '.myautolog.io',
      sameSite: "strict",
    })

    res.cookie("clientAuthToken", "", {
      expires: new Date(0),
      httpOnly: false,
      secure: true,
      domain: '.myautolog.io',
      sameSite: "strict",
    })
    res.json({ message: "Logout successful" })
  } catch (error) {
    console.log(error)
    console.error(error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})
export default router

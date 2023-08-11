import express from "express"
import authenticateToken from "../middleware/authenticateToken"
import { dbConnectionPool } from "../utilities/db"
import { AuthenticatedRequest } from "../types/requests"
import { Field, FieldPacket, OkPacket, RowDataPacket } from "mysql2/promise"

const router = express.Router()
router.get(
  "/getCollections",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else {
        const query =
          "SELECT collectionId, collectionName FROM Collection WHERE userId = ? ORDER BY collectionName ASC;"
        const queryValues = [req.userId]
        const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)

        res.json(rows)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.post(
  "/createCollection",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.body.collectionName) {
        res.status(422).json({ error: "missing collection name" })
      } else {
        const query =
          "INSERT INTO Collection (userId, collectionName) VALUES (?, ?);"
        const queryValues = [req.userId, req.body.collectionName]
        const [rows, fields]: [OkPacket, FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)
        res.json({ message: "Collection created" })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.delete(
  "/deleteCollection",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.query.collectionId) {
        res.status(422).json({ error: "missing collection id" })
      } else {
        const query = "DELETE FROM Collection WHERE collectionId = ?;"
        const queryValues = [req.query.collectionId]
        const [rows, fields]: [OkPacket, FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)
        if (rows.affectedRows > 0) {
          res.json({ message: "Collection deleted" })
        } else {
          res.status(422).json({ error: "Collection not found" })
        }
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)

router.put(
  "/updateCollection",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.userId) {
        res.status(422).json({ error: "bad login token" })
      } else if (!req.body.collectionId) {
        res.status(422).json({ error: "missing collection id" })
      } else if (!req.body.collectionName) {
        res.status(422).json({ error: "missing collection name" })
      } else {
        const query =
          "UPDATE Collection SET collectionName = ? WHERE collectionId = ? AND userId = ?;"
        const queryValues = [
          req.body.collectionName,
          req.body.collectionId,
          req.userId,
        ]
        const [rows, fields]: [OkPacket, FieldPacket[]] =
          await dbConnectionPool.query(query, queryValues)
        console.log(rows)
        if (rows.affectedRows > 0) {
          res.json({ message: "Collection updated" })
        } else {
          res.status(422).json({ error: "Collection not found" })
        }
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
)
module.exports = router

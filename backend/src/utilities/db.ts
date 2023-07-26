import mysql from "mysql2/promise"

export const dbConnectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "myautolog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})


import jwt from "jsonwebtoken"

function authenticateToken(req, res, next) {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Invalid login token" })
    }
    req.userId = decodedToken.userId
    next()
  })
 
}

export default authenticateToken
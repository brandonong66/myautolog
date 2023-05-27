const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken

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

module.exports = authenticateToken

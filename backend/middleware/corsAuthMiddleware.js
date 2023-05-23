const corsAuthMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true")
  next()
}

module.exports = corsAuthMiddleware

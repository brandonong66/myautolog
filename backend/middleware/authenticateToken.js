const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({error: "Unauthorized"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({error: "Forbidden"})
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken
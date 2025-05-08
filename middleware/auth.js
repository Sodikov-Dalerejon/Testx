const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).send("Auth token is invalid")
    }
    try {
        const decoded = jwt.verify(token, "qwerty25$")
        req.user = decoded
        next()
    }
    catch (e) {
        return res.status(400).send("Token is invalid")
    }
}
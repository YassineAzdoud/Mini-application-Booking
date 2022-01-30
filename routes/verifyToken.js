const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access-Denied");

    try {
        const verfied = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verfied;
        next()
    }catch(e) {
        res.status(400).send("invalid user")
    }
}
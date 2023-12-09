const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateToken(req, res, next) {
    const accessToken = req.cookies.access_token;
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
    if(!user) {
        return res.status(404).json({
            message: "Access token expired"
        })
    }
    req.user = user;
    next();
}

module.exports = authenticateToken;
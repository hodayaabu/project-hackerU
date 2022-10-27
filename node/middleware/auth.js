const config = require("config");
const jwt = require("JsonWebToken");

const auth = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        res.status(401).send("Access denied, no token provide");
        return;
    }

    try {

        const userInfo = jwt.verify(token, config.get("jwtKey"));
        req.user = userInfo;
        next();

    } catch (err) {
        console.log('err from auth middleware:', err);

        res.status(401).send('Access denied, invalid token');
    }
};

module.exports = auth;
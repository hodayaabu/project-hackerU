const config = require("config");
const jwt = require("JsonWebToken");


//Checking whether the user is connected and exists using a token
const auth = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        res.status(401).send("Access denied, no token provide");
        return;
    }

    try {
        const userInfo = jwt.verify(token, config.get("jwtKey"));

        //Creating a variable in the request named User with the information from the token
        req.user = userInfo;
        next();

    } catch (err) {
        console.log('err from auth middleware:', err);

        res.status(401).send('Access denied, invalid token');
    }
};

module.exports = auth;
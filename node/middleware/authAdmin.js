const config = require("config");
const jwt = require("JsonWebToken");

const authAdmin = async (req, res, next) => {
    const adminToken = req.header("admin-token");

    if (!adminToken) {
        res.status(401).send("Access denied, no admin token provide");
        return;
    }

    try {

        const userInfo = jwt.verify(adminToken, config.get("jwtKey"));
        req.user = userInfo;

        if (!req.user.admin) {
            res.status(401).send("Access denied, you are not an admin");
            return;
        }

        next();

    } catch (err) {
        console.log('err from authAdmin middleware:', err);

        res.status(401).send('Access denied, invalid adminToken');
    }
};

module.exports = authAdmin;
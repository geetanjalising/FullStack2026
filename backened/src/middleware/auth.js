const jwt = require("jsonwebtoken");
const USER = require("../models/User");

const auth = async (req, res, next) => {
    console.log("Auth middleware called");
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await USER.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = auth;


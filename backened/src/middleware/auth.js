const jwt = require("jsonwebtoken");
const USER = require("../models/User");

const auth = async (req, res, next) => {
    console.log("Auth middleware called");
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token received:", token);
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        const user = await USER.findById(decoded.id);
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        console.log("User authenticated:");
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = auth;

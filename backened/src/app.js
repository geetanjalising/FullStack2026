const express = require("express");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");
connectDB();
const allowedOrigins = [
    "https://shopping2026.netlify.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/upload", require("./routes/uploadRoutes"));

module.exports = app;
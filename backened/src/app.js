const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middlewares
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

module.exports = app;
require("dotenv").config();
const cors = require("cors");
const app = require("./src/app");
const seedProducts = require("./src/utils/seedProducts");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8007;
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(cors({
  origin: "https://shopping2026.netlify.app/", // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
}))

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", async () => {
  await seedProducts();
});
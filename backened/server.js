require("dotenv").config();
const cors = require("cors");
const app = require("./src/app");
const seedProducts = require("./src/utils/seedProducts");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8007;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", async () => {
  await seedProducts();
});
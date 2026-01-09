require("dotenv").config();
const app = require("./src/app");
const seedProducts = require("./src/utils/seedProducts");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8007;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", async () => {
  await seedProducts();
});
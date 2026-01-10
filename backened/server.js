require("dotenv").config();
const cors = require("cors");
const app = require("./src/app");
const seedProducts = require("./src/utils/seedProducts");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8007;
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", async () => {
  await seedProducts();
});
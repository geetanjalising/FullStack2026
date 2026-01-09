const axios = require("axios");
const Product = require("../models/Product");

const seedProducts = async () => {
    const count = await Product.countDocuments();

    if (count > 0) {
        console.log("Products already exist. Skipping seeding.");
        return;
    }

    const { data } = await axios.get("https://fakestoreapi.com/products");
    await Product.insertMany(data);

    console.log("Products seeded successfully");
};

module.exports = seedProducts;

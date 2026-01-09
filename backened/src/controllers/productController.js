const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const productsdata = await Product.find();
        res.status(201).json(productsdata);
    }
    catch (error) {
        console.log("error" + error.message);
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        res.status(201).json(product);
    }
    catch (error) {
        console.log("error" + error.message);
    }
};
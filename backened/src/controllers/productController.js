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

exports.addProduct = async (req, res) => {
    console.log("Request body:", req.body); // Log the request body for debugging
    try {
        const { title, price, description, category, image, quantity, rating } = req.body;
        const lastProduct =
            await Product.findOne().sort({ id: -1 });

        const nextId =
            lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: nextId,
            title,
            price,
            description,
            category,
            image,
            quantity,
            rating
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
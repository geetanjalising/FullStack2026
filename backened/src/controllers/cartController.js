const User = require("../models/User");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; // FakeStore ID (123)

        const product = await Product.findOne({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const user = await User.findById(userId);
        const cartItem = user.carts.find(
            item => item.productId == id
        );
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.carts.push({
                productId: id,
                quantity: 1
            });
        }

        await user.save();
        res.status(200).json({ message: "Product added to cart", carts: user.carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

exports.getCart = async (req, res) => {
    try {
        // 1️⃣ Auth middleware already verified user
        const userId = req.user._id;

        // 2️⃣ Get user cart
        const user = await User.findById(userId).lean();

        if (!user || user.carts.length === 0) {
            return res.status(200).json([]);
        }

        // 3️⃣ Extract product IDs from cart
        const productIds = user.carts.map(item => item.productId);

        // 4️⃣ Fetch full product details
        const products = await Product.find({
            id: { $in: productIds }
        }).lean();

        // 5️⃣ Merge quantity with product details
        const cartItems = products.map(product => {
            const cartItem = user.carts.find(
                item => item.productId === product.id
            );

            return {
                ...product,
                quantity: cartItem.quantity
            };
        });

        // 6️⃣ Send final cart
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; // FakeStore ID (123)
        const productId = Number(id);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("left iteamsfg", user.carts, productId);
        user.carts = user.carts.filter(item => item.productId !== productId);
        await user.save();

        res.status(200).json({ message: "Product removed from cart", carts: user.carts });
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
};

exports.increaseQuantity = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const productId = Number(req.params.id);

        const item = user.carts.find(
            item => item.productId === productId
        );

        if (!item) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        item.quantity += 1;

        await user.save();

        res.status(200).json({
            message: "Quantity increased",
            carts: user.carts
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to update cart" });
    }
};

exports.decreaseQuantity = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const productId = Number(req.params.id);

        const item = user.carts.find(
            item => item.productId === productId
        );

        if (!item) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        item.quantity -= 1;
        if (item.quantity <= 0) {
            user.carts = user.carts.filter(item => item.productId !== productId);
        }

        await user.save();

        res.json({
            message: "Quantity decreased",
            carts: user.carts
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to update cart" });
    }
};


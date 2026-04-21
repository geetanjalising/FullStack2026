const razorpay = require("../utils/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
    try {
        console.log("Received checkout request with body:", req.body); // Debug log
        const { amount } = req.body;

        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating order" });
    }
};

exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        checkoutItems,
        totalSum,
        userId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
    if (expectedSignature === razorpay_signature) {
        // ✅ Save order in DB
        const order = await Order.create({
            userId,
            items: checkoutItems,
            totalAmount: totalSum,
            paymentInfo: {
                razorpay_order_id,
                razorpay_payment_id
            }
        });

        res.json({ success: true, order });
    } else {
        res.status(400).json({
            success: false,
            message: "Invalid payment"
        });
    }
};

exports.orders = async (req, res) => {
    try {
        const { id } = req.params; // ✅ get from URL

        const orders = await Order.find({ userId: id }); // ✅ correct query

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting order history" });
    }
};
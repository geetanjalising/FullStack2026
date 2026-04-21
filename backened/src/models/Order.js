const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: String,

    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],

    totalAmount: Number,

    paymentInfo: {
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String,
        method: String
    },

    status: {
        type: String,
        default: "PLACED" // PLACED, SHIPPED, DELIVERED
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
const express = require("express");
const router = express.Router();
const { checkout, verifyPayment, orders } = require("../controllers/paymentController");

router.post("/create-order", checkout);
router.post("/verify", verifyPayment)
router.get("/orders/:id", orders)

module.exports = router;
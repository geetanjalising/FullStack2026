const router = require("express").Router();
const auth = require("../middleware/auth");
const { addToCart, getCart, removeFromCart, increaseQuantity, decreaseQuantity } = require("../controllers/cartController");

router.post("/:id", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:id", auth, removeFromCart);
router.patch("/increaseQty/:id", auth, increaseQuantity);
router.patch("/decreaseQty/:id", auth, decreaseQuantity);

module.exports = router;

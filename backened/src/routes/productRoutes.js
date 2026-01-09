const router = require("express").Router();
const { getAllProducts, getSingleProduct } = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
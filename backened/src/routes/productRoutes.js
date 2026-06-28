const router = require("express").Router();
const { getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct } = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/addproduct", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
module.exports = router;
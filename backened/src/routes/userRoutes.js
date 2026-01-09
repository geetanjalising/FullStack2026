const router = require("express").Router();
const { get } = require("mongoose");
const { userData, getAllUsers, validUser, deleteUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/userdata", auth, userData);
router.get("/getAllUsers", getAllUsers);
router.post("/validUser", auth, validUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;

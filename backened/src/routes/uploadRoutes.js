const router = require("express").Router();

const upload = require("../middleware/upload");

router.post("/image", upload.single("image"), async (req, res) => {
    console.log("hgbfvc cgtfv cghytgrfdcgy");
    res.status(200).json({
        success: true,
        imageUrl: req.file.location
    });


}
);

module.exports = router;
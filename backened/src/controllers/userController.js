const User = require("../models/User");

exports.userData = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);

    } catch (error) {
        console.error("Profile data error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error("Get all users error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

exports.validUser = async (req, res) => {
    res.status(200).json({
        valid: true,
        user: req.user
    });
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}

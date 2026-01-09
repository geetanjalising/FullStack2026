const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { fname, email, mobile, password, cpassword, address, pincode } = req.body;

        // 1️⃣ Validate input
        if (!fname || !email || !mobile || !password || !cpassword || !address || !pincode) {
            return res.status(422).json({ error: "Fill all required fields" });
        }

        // 2️⃣ Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }

        // 3️⃣ Password match
        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        // 4️⃣ Create user (do NOT save cpassword)
        const user = new User({
            fname,
            email,
            mobile,
            password,
            address,
            pincode
        });

        await user.save();

        // 5️⃣ Optional: auto-login after register
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // 2️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // 4️⃣ Generate token
        const token = generateToken(user._id);

        res.json({ token });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};


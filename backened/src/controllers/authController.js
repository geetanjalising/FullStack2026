const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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
        var role;
        if (email === "geetanjalisingh1815@gmail.com") {
            role = "admin";
        }
        else role = "user";
        // 4️⃣ Create user (do NOT save cpassword)
        const user = new User({
            fname,
            email,
            mobile,
            password,
            address,
            pincode,
            role
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


exports.forgotPassword = async (req, res) => {
    console.log("wertyhujiugfc ggj", req);
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });

        // 🔒 Security: don't reveal if user exists
        if (!user) {
            return res.json({ message: "If this email exists, a reset link has been sent" });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

        await user.save();


        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin: 20px 0;
      background-color: #28a745;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>Hi there,</p>
    <p>We received a request to reset your password for your <strong>ItSuitsUhh</strong> account.</p>

    <a href="${resetURL}" class="btn">Reset Password</a>

    <p>This link will expire in <strong>15 minutes</strong>.</p>

    <p>If you did not request a password reset, please ignore this email or contact support.</p>

    <div class="footer">
      <p>© 2026 ItSuitsUhh. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

        await sendEmail(user.email, "Password Reset", message);

        res.json({ message: "Reset link sent to email" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash new password
        user.password = password;

        // Clear token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
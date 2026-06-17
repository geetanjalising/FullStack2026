const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true, trim: true },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },

    mobile: { type: String, required: true },

    password: { type: String, required: true },

    address: String,
    pincode: String,

    carts: [{
        productId: {
            type: Number, // FakeStore ID (123)
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, { timestamps: true });

// hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);

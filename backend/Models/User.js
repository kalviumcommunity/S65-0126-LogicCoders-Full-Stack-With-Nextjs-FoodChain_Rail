const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["vendor", "admin"],
        default: "vendor"
    }
});

module.exports = mongoose.model("User", userSchema);

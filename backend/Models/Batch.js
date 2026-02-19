const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        enum: ["veg", "non-veg", "egg"],
        default: "veg"
    },
    kitchenLocation: {
        type: String,
        default: ""
    },
    ingredients: {
        type: String,
        default: ""
    },
    preparedAt: {
        type: Date,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    trainNumber: {
        type: String,
        required: true
    },
    qrCode: String
}, { timestamps: true });

module.exports = mongoose.model("Batch", batchSchema);

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
    preparedAt: {
        type: Date,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    hygieneStatus: {
        type: String,
        enum: ["good", "average", "bad"],
        default: "good"
    },
    trainNumber: {
        type: String,
        required: true
    },
    qrCode: String
}, { timestamps: true });

module.exports = mongoose.model("Batch", batchSchema);

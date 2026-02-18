const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    foodName: String,
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    preparedAt: Date,
    expiryTime: Date,
    hygieneStatus: String,
    trainNumber: String,
    qrCode: String
});

module.exports = mongoose.model("Batch", batchSchema);

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    passengerName: {
        type: String,
        default: "Anonymous"
    },
    trainCoach: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "resolved"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);

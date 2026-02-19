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
    category: {
        type: String,
        enum: ["stale_food", "foreign_object", "unhygienic_packaging", "wrong_order", "temperature", "general"],
        default: "general"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
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

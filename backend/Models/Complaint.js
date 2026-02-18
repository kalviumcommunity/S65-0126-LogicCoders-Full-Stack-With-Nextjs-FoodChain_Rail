const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
    },
    issue: String,
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);

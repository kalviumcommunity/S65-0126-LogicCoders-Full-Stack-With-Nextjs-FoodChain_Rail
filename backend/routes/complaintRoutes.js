const express = require("express");
const router = express.Router();
const Complaint = require("../Models/Complaint");

// Create complaint (public - passengers can report)
router.post("/create", async (req, res) => {
    try {
        const { batchId, issue, category, rating, passengerName, trainCoach } = req.body;

        if (!batchId || !issue) {
            return res.status(400).json({ message: "Batch ID and issue are required" });
        }

        const complaint = await Complaint.create({
            batchId,
            issue,
            category: category || "general",
            rating: rating ? Number(rating) : null,
            passengerName: passengerName || "Anonymous",
            trainCoach: trainCoach || ""
        });

        res.status(201).json({ message: "Complaint submitted successfully", complaint });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get complaints by batch ID
router.get("/batch/:batchId", async (req, res) => {
    try {
        const complaints = await Complaint.find({ batchId: req.params.batchId }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all complaints (admin)
router.get("/", async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("batchId", "foodName trainNumber")
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Complaint = require("./Models/Complaint");

// Create complaint
router.post("/create", async (req, res) => {
    const { batchId, issue } = req.body;

    const complaint = await Complaint.create({
        batchId,
        issue
    });

    res.json(complaint);
});

// Get all complaints (admin)
router.get("/", async (req, res) => {
    const complaints = await Complaint.find().populate("batchId");

    res.json(complaints);
});

module.exports = router;

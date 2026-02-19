const express = require("express");
const router = express.Router();
const Batch = require("../Models/Batch");
const QRCode = require("qrcode");
const protect = require("../Middlewares/authMiddleware");

// Create batch
router.post("/create", protect, async (req, res) => {
    try {
        const { foodName, category, kitchenLocation, ingredients, preparedAt, expiryTime, trainNumber } = req.body;

        if (!foodName || !preparedAt || !expiryTime || !trainNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const batch = new Batch({
            foodName,
            vendorId: req.user.id,
            category: category || "veg",
            kitchenLocation: kitchenLocation || "",
            ingredients: ingredients || "",
            preparedAt,
            expiryTime,
            trainNumber
        });

        const savedBatch = await batch.save();

        // Generate QR code containing the scan URL
        const scanUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/scan/${savedBatch._id}`;
        const qr = await QRCode.toDataURL(scanUrl);

        savedBatch.qrCode = qr;
        await savedBatch.save();

        res.status(201).json(savedBatch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all batches by vendor
router.get("/my", protect, async (req, res) => {
    try {
        const batches = await Batch.find({ vendorId: req.user.id }).sort({ createdAt: -1 });
        res.json(batches);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get batch by ID (for QR scan)
router.get("/:id", async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id).populate("vendorId", "name email");
        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.json(batch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Batch = require("./Models/Batch");
const QRCode = require("qrcode");
const protect = require("../middleware/authMiddleware");

// Create batch
router.post("/create", protect, async (req, res) => {
    const { foodName, preparedAt, expiryTime, hygieneStatus, trainNumber } = req.body;

    const batch = new Batch({
        foodName,
        vendorId: req.user.id,
        preparedAt,
        expiryTime,
        hygieneStatus,
        trainNumber
    });

    const savedBatch = await batch.save();

    // Generate QR (contains batch ID)
    const qr = await QRCode.toDataURL(savedBatch._id.toString());

    savedBatch.qrCode = qr;
    await savedBatch.save();

    res.json(savedBatch);
});

// Get batch by ID (for QR scan)
router.get("/:id", async (req, res) => {
    const batch = await Batch.findById(req.params.id).populate("vendorId", "name");

    res.json(batch);
});

module.exports = router;

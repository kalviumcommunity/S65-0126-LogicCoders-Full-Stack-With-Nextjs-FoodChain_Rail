const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/batch", require("./routes/batchRoutes"));
app.use("/api/complaint", require("./routes/complaintRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API Route
app.get("/", (req, res) => res.send("API is working!"));

// ✅ Add Authentication Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Open Mic Routes
const micsRoutes = require("./routes/mics");
app.use("/api/mics", micsRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

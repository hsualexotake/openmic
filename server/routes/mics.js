const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// ✅ Input Validation Function
const validateInput = (input) => {
  const regex = /^[a-zA-Z0-9\s.,!?()-]+$/; // Allow only safe characters
  return regex.test(input);
};

// Public Route: Get All Open Mics (Anyone Can Access)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM open_mics ORDER BY id ASC;");
    res.json(result.rows);
  } catch (error) {
    console.error("Database retrieval error:", error);
    res.status(500).json({ error: "Server error while retrieving open mics." });
  }
});

// Private Route: Add a New Open Mic (Admins Only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const {
    name,
    location,
    borough,
    cost,
    time,
    date,
    sign_up_method,
    latitude,
    longitude,
  } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required." });
  }

  try {
    await pool.query(
      "INSERT INTO open_mics (name, location, borough, cost, time, date, sign_up_method, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        name,
        location,
        borough,
        cost,
        time,
        date,
        sign_up_method,
        latitude,
        longitude,
      ]
    );
    res.status(201).json({ message: "Open mic added successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../db");

// Fetch all open mics
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM open_mics ORDER BY id ASC;");
    console.log("🔍 Database Query Result:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Server error while retrieving open mics." });
  }
});

// Add a new open mic
router.post("/", async (req, res) => {
  try {
    const { name, location, borough, cost, time, date, sign_up_method } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !location ||
      !borough ||
      !cost ||
      !time ||
      !date ||
      !sign_up_method
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Insert into database
    const newMic = await pool.query(
      "INSERT INTO open_mics (name, location, borough, cost, time, date, sign_up_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, location, borough, cost, time, date, sign_up_method]
    );

    console.log("✅ New Open Mic Added:", newMic.rows[0]);
    res.status(201).json(newMic.rows[0]);
  } catch (error) {
    console.error("❌ Error Adding Open Mic:", error);
    res.status(500).json({ error: "Server error while adding open mic." });
  }
});

module.exports = router;

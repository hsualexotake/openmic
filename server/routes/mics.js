const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM open_mics;");
    console.log("🔍 Database Query Result:", result.rows); // Log the query result
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

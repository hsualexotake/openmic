const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Check this!
  ssl: process.env.DATABASE_URL?.includes("supabase")
    ? { rejectUnauthorized: false }
    : false, // Only needed for Supabase or hosted DBs
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database");
});

pool.on("error", (err) => {
  console.error("❌ Database Connection Error:", err);
});

module.exports = pool;

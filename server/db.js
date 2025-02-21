const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("supabase")
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database");
});

pool.on("error", (err) => {
  console.error("❌ Database Connection Error:", err);
});

module.exports = pool;

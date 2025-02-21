const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get token from headers
  if (!authHeader) {
    console.log("❌ No Authorization header found");
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer TOKEN"
  console.log("🔹 Received Token:", token);

  if (!token) {
    console.log("❌ No token found after 'Bearer'");
    return res
      .status(403)
      .json({ error: "Access denied. Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // Debugging decoded token
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Middleware to Check If User is an Admin
const verifyAdmin = (req, res, next) => {
  console.log("🔹 Checking Admin Role for:", req.user); // Debugging user info

  if (!req.user || req.user.role !== "admin") {
    console.log("❌ Access denied. Not an admin.");
    return res.status(403).json({ error: "Admins only." });
  }

  console.log("✅ User is an admin, proceeding...");
  next();
};

module.exports = { verifyToken, verifyAdmin };

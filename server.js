require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

// Render provides PORT in production.
// Locally we'll default to 3000.
const PORT = process.env.PORT || 3000;

// Parse JSON requests (we'll need this soon)
app.use(express.json());

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV
  });
});
app.post("/api/birth-chart", (req, res) => {
  const birthDetails = req.body;

  res.json({
    success: true,
    received: birthDetails
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
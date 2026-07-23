const { Origin, Horoscope } = require("circular-natal-horoscope-js");
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
  try {
    const { year, month, day, hour, minute, latitude, longitude } = req.body;

    const origin = new Origin({
  year,
  month: month - 1,
  date: day,
  hour,
  minute,
  latitude,
  longitude
});

const horoscope = new Horoscope({
  origin,
  houseSystem: "placidus",
  zodiac: "tropical"
});


  const chart = {
  origin: horoscope.origin,
  sunSign: horoscope._sunSign,
  ascendant: horoscope._ascendant,
  midheaven: horoscope._midheaven,
  houses: horoscope._houses,
  planets: horoscope._celestialBodies,
  points: horoscope._celestialPoints,
  aspects: horoscope._aspects,
  houseSystem: horoscope._houseSystem,
  zodiac: horoscope._zodiac
};

res.json({
  success: true,
  chart
});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const { Origin, Horoscope } = require("circular-natal-horoscope-js");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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
app.post("/api/birth-chart", async(req, res) => {
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
app.post("/api/auth/magic-link", async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.SUPABASE_REDIRECT_URL
      }
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.json({
      success: true,
      message: "Magic link sent"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const Astronomy = require("astronomy-engine");

function extractTransitPositions() {
  const now = new Date();

  const bodies = [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto"
  ];

  const positions = {};

  for (const body of bodies) {
    const vec = Astronomy.GeoVector(
      Astronomy.Body[body],
      now,
      false
    );

    const ecl = Astronomy.Ecliptic(vec);

    positions[body] = ecl.elon;
  }

  return positions;
}

module.exports = {
  extractTransitPositions
};
const Astronomy = require("astronomy-engine");

const ASPECTS = [
  { name: "Conjunction", angle: 0, orb: 8 },
  { name: "Sextile", angle: 60, orb: 6 },
  { name: "Square", angle: 90, orb: 8 },
  { name: "Trine", angle: 120, orb: 8 },
  { name: "Opposition", angle: 180, orb: 8 }
];

const PLANET_WEIGHTS = {
  Pluto: 8,
  Neptune: 7,
  Uranus: 7,
  Saturn: 6,
  Jupiter: 5,
  Sun: 5,
  Moon: 5,
  Mars: 3,
  Venus: 3,
  Mercury: 2
};

const ASPECT_WEIGHTS = {
  Conjunction: 6,
  Opposition: 5,
  Square: 5,
  Trine: 4,
  Sextile: 3
};

function normalizeDifference(a, b) {
  let diff = Math.abs(a - b);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

function findNatalHouse(longitude, houses) {
  for (const house of houses) {
    const start = house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
    const end = house.ChartPosition.EndPosition.Ecliptic.DecimalDegrees;

    // House crosses 0° Aries
    if (start > end) {
      if (longitude >= start || longitude < end) {
        return house.id;
      }
    } else {
      if (longitude >= start && longitude < end) {
        return house.id;
      }
    }
  }

  return null;
}

function getApplyingStatus(
  transitPlanet,
  currentLon,
  natalLon,
  aspectAngle
) {
  const nowDiff = Math.abs(
    normalizeDifference(currentLon, natalLon) - aspectAngle
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const vec = Astronomy.GeoVector(
    Astronomy.Body[transitPlanet],
    tomorrow,
    false
  );

  const ecl = Astronomy.Ecliptic(vec);

  const tomorrowLon = ecl.elon;

  const tomorrowDiff = Math.abs(
    normalizeDifference(tomorrowLon, natalLon) - aspectAngle
  );

  if (tomorrowDiff < nowDiff) {
    return "Applying";
  }

  if (tomorrowDiff > nowDiff) {
    return "Separating";
  }

  return "Stationary";
}

function calculateImportance(aspect) {
  let score = 0;

  score += PLANET_WEIGHTS[aspect.transitPlanet] || 0;
  score += ASPECT_WEIGHTS[aspect.aspect] || 0;

  // tighter orb = stronger
  score += Math.max(0, 8 - aspect.orb);

  // applying = stronger than separating
  if (aspect.status === "Applying") {
    score += 2;
  }

  return Number(score.toFixed(2));
}

const SUPPORTED_NATAL_PLANETS = new Set([
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
]);

function detectAspects(natalPositions, transitPositions) {
  const aspects = [];

  for (const [transitPlanet, transitLon] of Object.entries(transitPositions)) {
    for (const natal of Object.values(natalPositions.planets)) {

  if (!SUPPORTED_NATAL_PLANETS.has(natal.label)) {
    continue;
  }
      
      const natalLon = natal.ChartPosition?.Ecliptic?.DecimalDegrees;

if (typeof natalLon !== "number") continue;

const diff = normalizeDifference(transitLon, natalLon);

const transitHouse = findNatalHouse(
  transitLon,
  natalPositions.houses
);
     

      for (const aspect of ASPECTS) {
        const orb = Math.abs(diff - aspect.angle);

        if (orb <= aspect.orb) {
          const result = {
  transitPlanet,
  natalPlanet: natal.label,
  aspect: aspect.name,
  orb: Number(orb.toFixed(2)),
  transitHouse,
  status: getApplyingStatus(
    transitPlanet,
    transitLon,
    natalLon,
    aspect.angle
  )
};

result.importance = calculateImportance(result);

aspects.push(result);
        }
      }
    }
  }
  aspects.sort((a, b) => b.importance - a.importance);
  return aspects;
}

module.exports = { detectAspects };
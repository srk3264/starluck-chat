const ASPECTS = [
  { name: "Conjunction", angle: 0, orb: 8 },
  { name: "Sextile", angle: 60, orb: 6 },
  { name: "Square", angle: 90, orb: 8 },
  { name: "Trine", angle: 120, orb: 8 },
  { name: "Opposition", angle: 180, orb: 8 }
];

function normalizeDifference(a, b) {
  let diff = Math.abs(a - b);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

function detectAspects(natalPositions, transitPositions) {
  const aspects = [];

  for (const [transitPlanet, transitLon] of Object.entries(transitPositions)) {
    for (const natal of Object.values(natalPositions.planets)) {
      
      const diff = normalizeDifference(
  transitLon,
  natal.ChartPosition?.Ecliptic?.DecimalDegrees
);
if (Number.isNaN(diff)) continue;
     

      for (const aspect of ASPECTS) {
        const orb = Math.abs(diff - aspect.angle);

        if (orb <= aspect.orb) {
          aspects.push({
            transitPlanet,
            natalPlanet: natal.label,
            aspect: aspect.name,
            orb: Number(orb.toFixed(2))
          });
        }
      }
    }
  }

  return aspects;
}

module.exports = { detectAspects };
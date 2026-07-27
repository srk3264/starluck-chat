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

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);

  // placeholder: compare tomorrow's longitude later
  const futureDiff = nowDiff;

  if (futureDiff < nowDiff) {
    return "Applying";
  }

  if (futureDiff > nowDiff) {
    return "Separating";
  }

  return "Stationary";
}


function detectAspects(natalPositions, transitPositions) {
  const aspects = [];

  for (const [transitPlanet, transitLon] of Object.entries(transitPositions)) {
    for (const natal of Object.values(natalPositions.planets)) {
      
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
          aspects.push({
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
});
        }
      }
    }
  }

  return aspects;
}

module.exports = { detectAspects };
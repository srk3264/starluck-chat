function extractNatalPositions(natalChart) {
  return {
    planets: natalChart.planets,
    houses: natalChart.houses,
    ascendant: natalChart.ascendant,
    midheaven: natalChart.midheaven,
    points: natalChart.points
  };
}

module.exports = {
  extractNatalPositions
};
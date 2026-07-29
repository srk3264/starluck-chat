function generateHoroscope(dominantThemes, aspects) {

  const topThemes = dominantThemes
    .slice(0, 3)
    .map(item => item.theme);

  const strongestAspect = [...aspects]
    .sort((a, b) => b.importance - a.importance)[0];

  const interpretation = strongestAspect?.interpretation || {};

  return {
    headline: buildHeadline(topThemes),

    summary: buildSummary(
      topThemes,
      strongestAspect
    ),

    focusAreas: topThemes,

    strongestInfluence: {
      planet: strongestAspect?.transitPlanet,
      aspect: strongestAspect?.aspect,
      natalPlanet: strongestAspect?.natalPlanet,
      house: strongestAspect?.transitHouse,
      status: strongestAspect?.status,
      intensity: interpretation.intensity,
      tone: interpretation.tone
    },

    advice: interpretation.advice || [],

    psychology: interpretation.psychology || [],

    lifeAreas: interpretation.lifeAreas || []
  };
}


function buildHeadline(themes) {
  return `Current focus: ${themes.join(", ")}`;
}


function buildSummary(themes, strongestAspect) {

  if (!strongestAspect) {
    return "No major active influences detected.";
  }

  const {
    transitPlanet,
    natalPlanet,
    aspect,
    transitHouse,
    status,
    interpretation = {}
  } = strongestAspect;

  const {
    tone = "neutral",
    intensity = "moderate"
  } = interpretation;

  return (
    `A ${intensity} ${tone} period centered on ${themes.join(", ")}. ` +
    `${transitPlanet} ${aspect} your natal ${natalPlanet} through House ${transitHouse}. ` +
    `This influence is currently ${status.toLowerCase()}.`
  );
}


module.exports = {
  generateHoroscope
};
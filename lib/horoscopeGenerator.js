function generateHoroscope(dominantThemes, aspects) {

  const topThemes = dominantThemes
    .slice(0, 3)
    .map(item => item.theme);

  const sortedAspects = [...aspects]
  .sort((a, b) => b.importance - a.importance);

const strongestAspect = sortedAspects[0];

const topAspects = sortedAspects
  .filter(aspect => aspect.interpretation)
  .slice(0, 3);

const interpretation = strongestAspect?.interpretation || {};

const opportunities = [];
const challenges = [];
const recommendations = [];

topAspects.forEach((aspect, index) => {

  // Give strongest aspect priority
  const weight = index === 0 ? 2 : 1;


  const tone = aspect.interpretation?.tone;

  if (tone === "flowing") {
  opportunities.push(
    ...aspect.interpretation.lifeAreas.slice(0, weight * 2)
  );
}

if (tone === "challenging" || tone === "polarizing") {
  challenges.push(
    ...aspect.interpretation.lifeAreas.slice(0, weight * 2)
  );
}

recommendations.push(
  ...aspect.interpretation.advice.slice(0, weight * 2)
);

});

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

    lifeAreas: interpretation.lifeAreas || [],

    opportunities: [...new Set(opportunities)],

challenges: [...new Set(challenges)],

recommendations: [...new Set(recommendations)]
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
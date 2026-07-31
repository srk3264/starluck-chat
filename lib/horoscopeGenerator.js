function unique(arr = []) {
  return [...new Set(arr)];
}

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

const strongestInterpretation = strongestAspect?.interpretation || {};

const opportunities = [];
const challenges = [];
const recommendations = [];



const primaryAspect = strongestAspect;

[primaryAspect].forEach((aspect) => {

  if (!aspect || !aspect.interpretation) return;

  const tone = aspect.interpretation.tone;

  if (tone === "flowing") {
    opportunities.push(
      ...aspect.interpretation.lifeAreas
    );
  }

  if (tone === "challenging" || tone === "polarizing") {
    challenges.push(
      ...aspect.interpretation.lifeAreas
    );
  }

  recommendations.push(
    ...aspect.interpretation.advice
  );

});

  return {
    headline: buildHeadline(
  strongestInterpretation.themes
    ? strongestInterpretation.themes.slice(0, 3)
    : topThemes
),

summary: buildSummary(
  strongestInterpretation.themes
    ? strongestInterpretation.themes.slice(0, 3)
    : topThemes,
  strongestAspect
),

   focusAreas: unique(
  strongestInterpretation.themes
    ? strongestInterpretation.themes.slice(0, 3)
    : topThemes
),

    strongestInfluence: {
      planet: strongestAspect?.transitPlanet,
      aspect: strongestAspect?.aspect,
      natalPlanet: strongestAspect?.natalPlanet,
      house: strongestAspect?.transitHouse,
      status: strongestAspect?.status,
      intensity: strongestInterpretation.intensity,
tone: strongestInterpretation.tone
    },

    advice: unique(strongestInterpretation.advice || []),

psychology: unique(strongestInterpretation.psychology || []),

lifeAreas: unique(strongestInterpretation.lifeAreas || []),

    opportunities: unique(opportunities),

    challenges: unique(challenges),

    recommendations: unique(recommendations)
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
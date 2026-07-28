const INTERPRETATIONS = {
  "Saturn-Sun-Square": {
    themes: [
      "responsibility",
      "discipline",
      "identity",
      "authority",
      "limitations"
    ],

    tone: "challenging",

    psychology: [
      "feeling tested",
      "developing self-discipline",
      "maturing through obstacles"
    ],

    lifeAreas: [
      "career",
      "reputation",
      "personal goals"
    ],

    advice: [
      "accept necessary responsibilities",
      "focus on long-term progress",
      "avoid discouragement"
    ],

    keywords: [
      "pressure",
      "growth",
      "commitment"
    ]
  }
};

function generateInterpretation(aspect) {
  const key = `${aspect.transitPlanet}-${aspect.natalPlanet}-${aspect.aspect}`;

  const rule = INTERPRETATIONS[key];

  if (!rule) {
    return {
      themes: [
        `${aspect.transitPlanet} influence`,
        `${aspect.aspect} adjustment`
      ],
      tone: "neutral",
      psychology: [],
      lifeAreas: [],
      advice: [],
      keywords: []
    };
  }

  return {
    ...rule,
    summary: `${aspect.transitPlanet} ${aspect.aspect} your natal ${aspect.natalPlanet}`,
  };
}

module.exports = {
  generateInterpretation
};
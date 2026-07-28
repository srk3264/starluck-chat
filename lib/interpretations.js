const PLANET_THEMES = {
  Sun: {
    themes: ["identity", "purpose", "confidence", "self-expression"],
    lifeAreas: ["ego", "leadership", "personal direction"]
  },

  Moon: {
    themes: ["emotions", "habits", "security", "instincts"],
    lifeAreas: ["home", "family", "emotional life"]
  },

  Mercury: {
    themes: ["communication", "thinking", "learning", "decisions"],
    lifeAreas: ["ideas", "messages", "contracts"]
  },

  Venus: {
    themes: ["relationships", "love", "values", "pleasure"],
    lifeAreas: ["romance", "finances", "creativity"]
  },

  Mars: {
    themes: ["action", "drive", "conflict", "motivation"],
    lifeAreas: ["energy", "ambition", "competition"]
  },

  Jupiter: {
    themes: ["growth", "expansion", "optimism", "opportunity"],
    lifeAreas: ["education", "travel", "beliefs"]
  },

  Saturn: {
    themes: ["discipline", "responsibility", "limits", "maturity"],
    lifeAreas: ["career", "commitments", "structures"]
  },

  Uranus: {
    themes: ["change", "freedom", "innovation", "awakening"],
    lifeAreas: ["technology", "independence", "new directions"]
  },

  Neptune: {
    themes: ["intuition", "spirituality", "imagination", "dissolution"],
    lifeAreas: ["dreams", "creativity", "ideals"]
  },

  Pluto: {
    themes: ["transformation", "power", "rebirth", "deep change"],
    lifeAreas: ["psychology", "control", "evolution"]
  }
};

const ASPECT_MODIFIERS = {
  Conjunction: {
    tone: "intense",
    keywords: ["activation", "focus", "new cycle"]
  },

  Sextile: {
    tone: "constructive",
    keywords: ["opportunity", "cooperation", "support"]
  },

  Square: {
    tone: "challenging",
    keywords: ["tension", "growth", "adjustment"]
  },

  Trine: {
    tone: "flowing",
    keywords: ["ease", "talent", "development"]
  },

  Opposition: {
    tone: "polarizing",
    keywords: ["awareness", "balance", "relationship"]
  }
};

function generateInterpretation(aspect) {
  const transit = PLANET_THEMES[aspect.transitPlanet];
  const natal = PLANET_THEMES[aspect.natalPlanet];
  const modifier = ASPECT_MODIFIERS[aspect.aspect];

  if (!transit || !natal || !modifier) {
    return {
      themes: [],
      tone: "neutral",
      psychology: [],
      lifeAreas: [],
      advice: [],
      keywords: []
    };
  }

  return {
    themes: [
      ...transit.themes,
      ...natal.themes
    ],

    tone: modifier.tone,

    psychology: [
      `${aspect.transitPlanet} activates natal ${aspect.natalPlanet} themes`,
      `The ${aspect.aspect.toLowerCase()} aspect creates ${modifier.tone} experiences`
    ],

    lifeAreas: [
      ...transit.lifeAreas,
      ...natal.lifeAreas
    ],

    advice: [
      `Work consciously with ${aspect.transitPlanet} energy`,
      `Use ${aspect.aspect.toLowerCase()} patterns for personal development`
    ],

    keywords: [
      ...modifier.keywords,
      ...transit.themes.slice(0, 2),
      ...natal.themes.slice(0, 2)
    ]
  };
}

module.exports = {
  generateInterpretation
};
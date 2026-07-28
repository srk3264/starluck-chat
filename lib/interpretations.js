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

const HOUSE_MODIFIERS = {
  1: {
    themes: ["identity", "self-expression"],
    lifeAreas: ["appearance", "personal direction"],
    advice: ["take initiative"],
    keywords: ["self"]
  },

  2: {
    themes: ["resources", "values"],
    lifeAreas: ["money", "possessions"],
    advice: ["review priorities"],
    keywords: ["finances"]
  },

  3: {
    themes: ["communication", "learning"],
    lifeAreas: ["siblings", "local environment"],
    advice: ["share ideas"],
    keywords: ["communication"]
  },

  4: {
    themes: ["home", "roots"],
    lifeAreas: ["family", "property"],
    advice: ["strengthen foundations"],
    keywords: ["home"]
  },

  5: {
    themes: ["creativity", "romance"],
    lifeAreas: ["children", "self-expression"],
    advice: ["express yourself"],
    keywords: ["creativity"]
  },

  6: {
    themes: ["work", "health"],
    lifeAreas: ["daily routines", "service"],
    advice: ["improve routines"],
    keywords: ["health"]
  },

  7: {
    themes: ["partnership"],
    lifeAreas: ["relationships", "agreements"],
    advice: ["seek balance"],
    keywords: ["relationships"]
  },

  8: {
    themes: ["transformation", "shared resources"],
    lifeAreas: ["intimacy", "finance"],
    advice: ["embrace change"],
    keywords: ["transformation"]
  },

  9: {
    themes: ["growth", "beliefs"],
    lifeAreas: ["travel", "education"],
    advice: ["broaden horizons"],
    keywords: ["expansion"]
  },

  10: {
    themes: ["achievement", "purpose"],
    lifeAreas: ["career", "reputation"],
    advice: ["focus on long-term goals"],
    keywords: ["career"]
  },

  11: {
    themes: ["community", "future"],
    lifeAreas: ["friends", "groups"],
    advice: ["collaborate"],
    keywords: ["networks"]
  },

  12: {
    themes: ["reflection", "healing"],
    lifeAreas: ["solitude", "spirituality"],
    advice: ["rest and reflect"],
    keywords: ["inner growth"]
  }
};

const STATUS_MODIFIERS = {
  Applying: {
    psychology: [
      "The influence is building and becoming more noticeable."
    ],
    advice: [
      "Prepare for the energy to strengthen."
    ]
  },

  Separating: {
    psychology: [
      "The strongest phase has likely passed."
    ],
    advice: [
      "Reflect on recent developments and integrate the lessons."
    ]
  },

  Stationary: {
    psychology: [
      "The influence is steady and highly concentrated."
    ],
    advice: [
      "Pay close attention to recurring themes."
    ]
  }
};

const getIntensity = (orb) => {
  if (orb <= 1) return "very strong";
  if (orb <= 3) return "strong";
  if (orb <= 5) return "moderate";
  return "subtle";
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

const house = HOUSE_MODIFIERS[aspect.transitHouse];
const status = STATUS_MODIFIERS[aspect.status];
const intensity = getIntensity(aspect.orb);
return {
  themes: [
    ...transit.themes,
    ...natal.themes,
    ...(house?.themes || [])
  ],

  tone: modifier.tone,

psychology: [
  `${aspect.transitPlanet} activates natal ${aspect.natalPlanet} themes`,
  `The ${aspect.aspect.toLowerCase()} aspect creates ${modifier.tone} experiences`,
  ...(status?.psychology || [])
],

  lifeAreas: [
    ...transit.lifeAreas,
    ...natal.lifeAreas,
    ...(house?.lifeAreas || [])
  ],

  advice: [
  `Work consciously with ${aspect.transitPlanet} energy`,
  `Use ${aspect.aspect.toLowerCase()} patterns for personal development`,
  ...(house?.advice || []),
  ...(status?.advice || [])
],

  keywords: [
  ...modifier.keywords,
  ...transit.themes.slice(0, 2),
  ...natal.themes.slice(0, 2),
  ...(house?.keywords || [])
],

intensity
};
}

module.exports = {
  generateInterpretation
};
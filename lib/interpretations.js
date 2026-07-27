const INTERPRETATIONS = {
  "Pluto-Sun-Square": "Deep transformation of identity, power, and personal direction.",
  "Pluto-Sun-Trine": "A period of powerful personal growth and regeneration.",
  "Saturn-Sun-Square": "Challenges around responsibility, discipline, and self-expression.",
  "Saturn-Sun-Trine": "Building confidence through structure and long-term effort.",
  "Jupiter-Sun-Trine": "Expansion, optimism, and increased opportunities.",
  "Jupiter-Sun-Conjunction": "Growth, confidence, and new possibilities.",
  "Uranus-Moon-Square": "Emotional changes, disruptions, and a need for freedom.",
  "Neptune-Moon-Trine": "Heightened intuition, sensitivity, and imagination."
};

function generateInterpretation(aspect) {
  const key = `${aspect.transitPlanet}-${aspect.natalPlanet}-${aspect.aspect}`;

  return (
    INTERPRETATIONS[key] ||
    `${aspect.transitPlanet} ${aspect.aspect} your natal ${aspect.natalPlanet} suggests a period of change and development.`
  );
}

module.exports = {
  generateInterpretation
};
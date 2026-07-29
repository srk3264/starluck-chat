function aggregateThemes(aspects) {
  const scores = {};

  for (const aspect of aspects) {
    const interpretation = aspect.interpretation;

    if (!interpretation) continue;

    for (const theme of interpretation.themes) {
      scores[theme] = (scores[theme] || 0) + aspect.importance;
    }
  }

  return Object.entries(scores)
  .map(([theme, score]) => ({
    theme,
    score: Number(score.toFixed(2))
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);
}

module.exports = {
  aggregateThemes
};
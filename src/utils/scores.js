export const saveScore = (score) => {
  const scores = getScores();
  scores.push(score);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 10)));
};

export const getScores = () => {
  const scores = localStorage.getItem('highScores');
  return scores ? JSON.parse(scores) : [];
}; 
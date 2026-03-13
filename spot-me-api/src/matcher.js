function score(user, candidate) {
  const gymMatch = user.gym === candidate.gym ? 1 : 0;
  const sharedSlots = user.timeSlots.filter(s => candidate.timeSlots.includes(s)).length;
  const sharedFocus = user.trainingFocus.filter(f => candidate.trainingFocus.includes(f)).length;
  return gymMatch + sharedSlots + sharedFocus;
}

function getMatches(user, allUsers) {
  return allUsers
    .filter(c => c.userId !== user.userId)
    .map(c => ({ ...c, score: score(user, c) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);
}

module.exports = { getMatches };

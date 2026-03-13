function score(user, candidate) {
  const gymMatch = user.gym === candidate.gym ? 1 : 0;
  const focusMatch = user.focus === candidate.focus ? 1 : 0;
  const sharedSlots = user.slots.filter(s => candidate.slots.includes(s)).length;
  return gymMatch + focusMatch + sharedSlots;
}

function getMatches(user, allUsers) {
  return allUsers
    .filter(c => c.userId !== user.userId)
    .map(c => ({ ...c, score: score(user, c) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);
}

module.exports = { getMatches };

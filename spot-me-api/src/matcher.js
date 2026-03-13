function score(user, candidate) {
  const gymMatch = user.gym === candidate.gym ? 1 : 0;
  const timeSlotMatch = user.timeSlot === candidate.timeSlot ? 1 : 0;
  const sharedDays = user.days.filter(d => candidate.days.includes(d)).length;
  const sharedFocus = user.focus.filter(f => candidate.focus.includes(f)).length;
  return gymMatch + timeSlotMatch + sharedDays + sharedFocus;
}

function getMatches(user, allUsers) {
  return allUsers
    .filter(c => c.userId !== user.userId)
    .map(c => ({ ...c, score: score(user, c) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);
}

module.exports = { getMatches };

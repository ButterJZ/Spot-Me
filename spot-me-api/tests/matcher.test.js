const { getMatches } = require('../src/matcher');

const base = { userId: 'u1', name: 'Alex', gym: 'LA Fitness', trainingFocus: ['chest', 'arms'], timeSlots: ['Mon 6pm', 'Wed 7am'] };

test('returns empty array when no other users', () => {
  expect(getMatches(base, [])).toEqual([]);
});

test('excludes self from results', () => {
  expect(getMatches(base, [base])).toEqual([]);
});

test('excludes users with score 0', () => {
  const noOverlap = { userId: 'u2', name: 'Sam', gym: 'Planet Fitness', trainingFocus: ['legs'], timeSlots: ['Fri 5pm'] };
  expect(getMatches(base, [noOverlap])).toEqual([]);
});

test('scores gym match correctly', () => {
  const sameGym = { userId: 'u2', name: 'Sam', gym: 'LA Fitness', trainingFocus: ['legs'], timeSlots: ['Fri 5pm'] };
  const [match] = getMatches(base, [sameGym]);
  expect(match.score).toBe(1);
});

test('scores shared time slots', () => {
  const sharedSlots = { userId: 'u2', name: 'Sam', gym: 'Other', trainingFocus: [], timeSlots: ['Mon 6pm', 'Wed 7am'] };
  const [match] = getMatches(base, [sharedSlots]);
  expect(match.score).toBe(2);
});

test('scores shared training focus', () => {
  const sharedFocus = { userId: 'u2', name: 'Sam', gym: 'Other', trainingFocus: ['chest', 'arms'], timeSlots: [] };
  const [match] = getMatches(base, [sharedFocus]);
  expect(match.score).toBe(2);
});

test('max score 4 (gym + 2 slots + 1 focus)', () => {
  const perfect = { userId: 'u2', name: 'Sam', gym: 'LA Fitness', trainingFocus: ['chest'], timeSlots: ['Mon 6pm'] };
  const [match] = getMatches(base, [perfect]);
  expect(match.score).toBe(3);
});

test('results are sorted descending by score', () => {
  const weak = { userId: 'u2', name: 'Weak', gym: 'Other', trainingFocus: ['chest'], timeSlots: [] };
  const strong = { userId: 'u3', name: 'Strong', gym: 'LA Fitness', trainingFocus: ['chest'], timeSlots: ['Mon 6pm'] };
  const results = getMatches(base, [weak, strong]);
  expect(results[0].userId).toBe('u3');
  expect(results[1].userId).toBe('u2');
});

test('match result includes score field', () => {
  const sameGym = { userId: 'u2', name: 'Sam', gym: 'LA Fitness', trainingFocus: [], timeSlots: [] };
  const [match] = getMatches(base, [sameGym]);
  expect(match).toHaveProperty('score');
  expect(match.userId).toBe('u2');
});

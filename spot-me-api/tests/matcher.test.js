const { getMatches } = require('../src/matcher');

const base = {
  userId: 'u1', name: 'Alex', gym: 'LA Fitness',
  focus: ['Chest', 'Arms'], days: ['Mon', 'Wed'], timeSlot: '6pm-7pm'
};

test('returns empty array when no other users', () => {
  expect(getMatches(base, [])).toEqual([]);
});

test('excludes self from results', () => {
  expect(getMatches(base, [base])).toEqual([]);
});

test('excludes users with score 0', () => {
  const noOverlap = {
    userId: 'u2', name: 'Sam', gym: 'Planet Fitness',
    focus: ['Yoga'], days: ['Tue'], timeSlot: '7am-8am'
  };
  expect(getMatches(base, [noOverlap])).toEqual([]);
});

test('scores gym match', () => {
  const sameGym = {
    userId: 'u2', name: 'Sam', gym: 'LA Fitness',
    focus: ['Yoga'], days: ['Tue'], timeSlot: '7am-8am'
  };
  const [match] = getMatches(base, [sameGym]);
  expect(match.score).toBe(1);
});

test('scores same timeSlot', () => {
  const sameSlot = {
    userId: 'u2', name: 'Sam', gym: 'Other',
    focus: [], days: ['Fri'], timeSlot: '6pm-7pm'
  };
  const [match] = getMatches(base, [sameSlot]);
  expect(match.score).toBe(1);
});

test('scores shared days', () => {
  const sharedDays = {
    userId: 'u2', name: 'Sam', gym: 'Other',
    focus: [], days: ['Mon', 'Wed'], timeSlot: '7am-8am'
  };
  const [match] = getMatches(base, [sharedDays]);
  expect(match.score).toBe(2);
});

test('scores shared focus', () => {
  const sharedFocus = {
    userId: 'u2', name: 'Sam', gym: 'Other',
    focus: ['Chest', 'Arms'], days: ['Fri'], timeSlot: '7am-8am'
  };
  const [match] = getMatches(base, [sharedFocus]);
  expect(match.score).toBe(2);
});

test('combined score: gym + timeSlot + days + focus', () => {
  const perfect = {
    userId: 'u2', name: 'Sam', gym: 'LA Fitness',
    focus: ['Chest'], days: ['Mon'], timeSlot: '6pm-7pm'
  };
  const [match] = getMatches(base, [perfect]);
  expect(match.score).toBe(4); // gym(1) + timeSlot(1) + days(1) + focus(1)
});

test('results sorted descending by score', () => {
  const weak = {
    userId: 'u2', name: 'Weak', gym: 'Other',
    focus: ['Chest'], days: ['Fri'], timeSlot: '7am-8am'
  };
  const strong = {
    userId: 'u3', name: 'Strong', gym: 'LA Fitness',
    focus: ['Chest'], days: ['Mon'], timeSlot: '6pm-7pm'
  };
  const results = getMatches(base, [weak, strong]);
  expect(results[0].userId).toBe('u3');
  expect(results[1].userId).toBe('u2');
});

test('match result includes score field and all user fields', () => {
  const sameGym = {
    userId: 'u2', name: 'Sam', gym: 'LA Fitness',
    focus: [], days: [], timeSlot: '7am-8am'
  };
  const [match] = getMatches(base, [sameGym]);
  expect(match).toHaveProperty('score');
  expect(match.userId).toBe('u2');
  expect(match.name).toBe('Sam');
});

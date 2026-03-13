const { getMatches } = require('../src/matcher');

const base = {
  userId: 'u1', name: 'Alex', gym: 'Anytime Fitness - Downtown',
  focus: 'Strength', slots: ['Mon 7pm', 'Wed 7pm']
};

test('returns empty array when no other users', () => {
  expect(getMatches(base, [])).toEqual([]);
});

test('excludes self from results', () => {
  expect(getMatches(base, [base])).toEqual([]);
});

test('excludes users with score 0', () => {
  const noOverlap = {
    userId: 'u2', name: 'Sam', gym: 'Fit Factory - West',
    focus: 'Fat Loss', slots: ['Tue 6am']
  };
  expect(getMatches(base, [noOverlap])).toEqual([]);
});

test('scores gym match', () => {
  const sameGym = {
    userId: 'u2', name: 'Sam', gym: 'Anytime Fitness - Downtown',
    focus: 'Fat Loss', slots: ['Tue 6am']
  };
  const [match] = getMatches(base, [sameGym]);
  expect(match.score).toBe(1);
});

test('scores same focus', () => {
  const sameFocus = {
    userId: 'u2', name: 'Sam', gym: 'Other',
    focus: 'Strength', slots: ['Tue 6am']
  };
  const [match] = getMatches(base, [sameFocus]);
  expect(match.score).toBe(1);
});

test('scores shared slots', () => {
  const sharedSlots = {
    userId: 'u2', name: 'Sam', gym: 'Other',
    focus: 'Fat Loss', slots: ['Mon 7pm', 'Wed 7pm']
  };
  const [match] = getMatches(base, [sharedSlots]);
  expect(match.score).toBe(2);
});

test('combined score: gym + focus + slots', () => {
  const perfect = {
    userId: 'u2', name: 'Sam', gym: 'Anytime Fitness - Downtown',
    focus: 'Strength', slots: ['Mon 7pm', 'Wed 7pm']
  };
  const [match] = getMatches(base, [perfect]);
  expect(match.score).toBe(4); // gym(1) + focus(1) + slots(2)
});

test('results sorted descending by score', () => {
  const weak = {
    userId: 'u2', name: 'Weak', gym: 'Other',
    focus: 'Strength', slots: ['Fri 7pm']
  };
  const strong = {
    userId: 'u3', name: 'Strong', gym: 'Anytime Fitness - Downtown',
    focus: 'Strength', slots: ['Mon 7pm']
  };
  const results = getMatches(base, [weak, strong]);
  expect(results[0].userId).toBe('u3');
  expect(results[1].userId).toBe('u2');
});

test('match result includes score field and all user fields', () => {
  const sameGym = {
    userId: 'u2', name: 'Sam', gym: 'Anytime Fitness - Downtown',
    focus: 'Fat Loss', slots: []
  };
  const [match] = getMatches(base, [sameGym]);
  expect(match).toHaveProperty('score');
  expect(match.userId).toBe('u2');
  expect(match.name).toBe('Sam');
});

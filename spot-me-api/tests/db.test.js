const db = require('../src/db');

beforeEach(() => db._reset());

test('saveUser stores and returns user', () => {
  const user = { userId: '1', name: 'Alex', gym: 'LA Fitness', trainingFocus: ['chest'], timeSlots: ['Mon 6pm'] };
  const saved = db.saveUser(user);
  expect(saved).toEqual(user);
});

test('getUser returns stored user', () => {
  const user = { userId: '2', name: 'Sam', gym: 'Gold Gym', trainingFocus: [], timeSlots: [] };
  db.saveUser(user);
  expect(db.getUser('2')).toEqual(user);
});

test('getUser returns null for unknown id', () => {
  expect(db.getUser('nope')).toBeNull();
});

test('getAllUsers returns all stored users', () => {
  db.saveUser({ userId: 'a', name: 'A', gym: 'X', trainingFocus: [], timeSlots: [] });
  db.saveUser({ userId: 'b', name: 'B', gym: 'Y', trainingFocus: [], timeSlots: [] });
  expect(db.getAllUsers()).toHaveLength(2);
});

test('saveUser upserts on same userId', () => {
  db.saveUser({ userId: '1', name: 'Old', gym: 'X', trainingFocus: [], timeSlots: [] });
  db.saveUser({ userId: '1', name: 'New', gym: 'X', trainingFocus: [], timeSlots: [] });
  expect(db.getAllUsers()).toHaveLength(1);
  expect(db.getUser('1').name).toBe('New');
});

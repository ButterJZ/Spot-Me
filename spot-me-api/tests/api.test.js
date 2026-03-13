const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

beforeEach(() => db._reset());

describe('GET /api/health', () => {
  test('returns 200 ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /api/profile', () => {
  const validBody = {
    name: 'Alex', gym: 'Anytime Fitness - Downtown',
    focus: 'Strength', slots: ['Mon 7pm', 'Wed 7pm']
  };

  test('returns 201 with userId on valid body', async () => {
    const res = await request(app).post('/api/profile').send(validBody);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(validBody);
    expect(res.body.userId).toBeDefined();
  });

  test('returns 400 when name is missing', async () => {
    const res = await request(app).post('/api/profile').send({ gym: 'X', focus: 'Strength', slots: [] });
    expect(res.status).toBe(400);
  });

  test('returns 400 when gym is missing', async () => {
    const res = await request(app).post('/api/profile').send({ name: 'X', focus: 'Strength', slots: [] });
    expect(res.status).toBe(400);
  });

  test('returns 400 when focus is missing', async () => {
    const res = await request(app).post('/api/profile').send({ name: 'X', gym: 'Y', slots: [] });
    expect(res.status).toBe(400);
  });

  test('returns 400 when slots is missing', async () => {
    const res = await request(app).post('/api/profile').send({ name: 'X', gym: 'Y', focus: 'Strength' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/matches/:userId', () => {
  test('returns 404 for unknown userId', async () => {
    const res = await request(app).get('/api/matches/unknown');
    expect(res.status).toBe(404);
  });

  test('returns empty array when no matches', async () => {
    const profile = await request(app).post('/api/profile').send({
      name: 'Alex', gym: 'Anytime Fitness - Downtown', focus: 'Strength', slots: ['Mon 7pm']
    });
    const res = await request(app).get(`/api/matches/${profile.body.userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns matches sorted by score', async () => {
    const alex = await request(app).post('/api/profile').send({
      name: 'Alex', gym: 'Anytime Fitness - Downtown', focus: 'Strength', slots: ['Mon 7pm']
    });
    await request(app).post('/api/profile').send({
      name: 'Sam', gym: 'Anytime Fitness - Downtown', focus: 'Strength', slots: ['Mon 7pm']
    });
    await request(app).post('/api/profile').send({
      name: 'Jordan', gym: 'Fit Factory - West', focus: 'Fat Loss', slots: ['Tue 6am']
    });
    const res = await request(app).get(`/api/matches/${alex.body.userId}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe('Sam');
    expect(res.body[0]).toHaveProperty('score');
  });
});

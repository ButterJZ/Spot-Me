const express = require('express');
const { randomUUID } = require('crypto');
const db = require('../db');
const { getMatches } = require('../matcher');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/profile', (req, res) => {
  const { name, gym, trainingFocus, timeSlots } = req.body;
  if (!name || !gym || !trainingFocus || !timeSlots) {
    return res.status(400).json({ error: 'name, gym, trainingFocus, and timeSlots are required' });
  }
  const user = { userId: randomUUID(), name, gym, trainingFocus, timeSlots };
  db.saveUser(user);
  res.status(201).json(user);
});

router.get('/matches/:userId', (req, res) => {
  const user = db.getUser(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const matches = getMatches(user, db.getAllUsers());
  res.json(matches);
});

module.exports = router;

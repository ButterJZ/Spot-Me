const express = require('express');
const { randomUUID } = require('crypto');
const db = require('../db');
const { getMatches } = require('../matcher');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/profile', (req, res) => {
  const { name, gym, focus, days, timeSlot } = req.body;
  if (!name || !gym || !focus || !days || !timeSlot) {
    return res.status(400).json({ error: 'name, gym, focus, days, and timeSlot are required' });
  }
  const user = { userId: randomUUID(), name, gym, focus, days, timeSlot };
  db.saveUser(user);
  res.status(201).json(user);
});

// P4 Firestore handoff: if db.getUser/getAllUsers become async, make this handler
// async and await both calls — otherwise matches will silently return nothing.
router.get('/matches/:userId', (req, res) => {
  const user = db.getUser(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const matches = getMatches(user, db.getAllUsers());
  res.json(matches);
});

module.exports = router;

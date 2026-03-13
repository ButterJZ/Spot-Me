# GymBuddy Matchmaker — Backend Design Spec
Date: 2026-03-13

## Overview

Express + Node.js backend for the Spot-Me gym buddy matching app. Uses a layered db-adapter architecture so the in-memory store can be swapped for Firebase Firestore (by P4) without touching routes or matching logic.

---

## File Structure

```
spot-me-api/
├── src/
│   ├── routes/
│   │   └── api.js        # All route handlers
│   ├── db.js             # In-memory adapter (P4 swaps for Firestore)
│   ├── matcher.js        # Scoring + filtering logic
│   └── app.js            # Express app config (no listen call)
├── seed.js               # Seed script — run once before demo
├── server.js             # Entry point — app.listen()
├── .env                  # PORT=3001
├── .gitignore            # node_modules, .env
└── package.json
```

---

## API Contract

### POST /api/profile
- **Body:** `{ name, gym, trainingFocus: string[], timeSlots: string[] }`
- **Response 201:** `{ userId, name, gym, trainingFocus, timeSlots }`
- **Response 400:** missing required fields

### GET /api/matches/:userId
- **Response 200:** Array of matches sorted descending by score, score > 0 only
  ```json
  [{ "userId": "...", "name": "...", "gym": "...", "trainingFocus": [...], "timeSlots": [...], "score": 3 }]
  ```
- **Response 404:** userId not found

### GET /api/health
- **Response 200:** `{ "status": "ok" }`

---

## Matching Logic

```js
score = (user.gym === candidate.gym ? 1 : 0)
      + sharedTimeSlots.length
      + sharedTrainingFocus.length
```

- Filter: `score > 0`, exclude self
- Sort: descending by score
- Return: top results (all with score > 0)

---

## DB Adapter Interface (`src/db.js`)

```js
saveUser(user)     // upsert by userId — returns saved user
getUser(userId)    // returns user object or null
getAllUsers()      // returns array of all users
```

In-memory implementation uses a plain JS `Map`. P4 replaces only this file with Firestore calls — interface stays identical.

`userId` is generated server-side via `crypto.randomUUID()` on first save.

---

## Error Handling

- `POST /api/profile` — 400 if `name`, `gym`, `trainingFocus`, or `timeSlots` missing
- `GET /api/matches/:userId` — 404 if user not found
- Global Express error middleware — catches unexpected errors → 500

---

## Seed Data (`seed.js`)

Standalone script that POSTs 6 fake users to `POST /api/profile`. Covers enough overlap for demo:
- 3–4 users at the same gym
- Mixed time slots ("Mon 6pm", "Wed 7am", "Fri 5pm", etc.)
- Mixed training focus ("chest", "legs", "cardio", "arms")

Run with: `node seed.js`

---

## Integration Notes for P4 (Firestore Swap)

1. Replace `src/db.js` with Firestore implementation
2. Preserve the `saveUser` / `getUser` / `getAllUsers` interface exactly
3. Add Firebase credentials to `.env`
4. No changes needed to routes, matcher, or server

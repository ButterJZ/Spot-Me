# Spot-Me

Spot-Me is a fast gym buddy matching app. Users fill out a short form, and the system recommends potential gym partners based on **gym location**, **training goals**, and **available time slots**.

> Best for: Hackathons, MVP validation, and campus/community fitness matching

## Core Features (MVP)

- Users submit preferences (location, training focus, schedule)
- The system calculates match scores and returns candidates
- Basic profile display (nickname, preferences, time-overlap summary)

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: Firebase Firestore (low setup overhead, real-time ready)
- **UI**: Tailwind CSS + shadcn/ui
- **Matching Logic**: JavaScript overlap scoring

## Matching Rules (Simple Version)

By default, the total score is calculated from:

- **Gym location match** (same gym gets priority)
- **Training goal match** (e.g., muscle gain / fat loss / strength)
- **Time overlap** (more shared availability = higher score)

You can adjust weights based on your needs, for example:

- Location: 40%
- Training goal: 30%
- Time overlap: 30%

## User Flow

1. Open the home page and complete profile preferences
2. Submit the form and go to the results page
3. Browse recommended matches and view why they matched
4. (Optional) Start contact or save favorites

## Quick Start (Suggested)

> This repository is currently project planning focused. If you want to implement it, use the setup below.

### 1) Initialize Frontend

```bash
npm create vite@latest spot-me-web
cd spot-me-web
npm install
```

### 2) Initialize Backend

```bash
mkdir spot-me-api && cd spot-me-api
npm init -y
npm install express cors firebase-admin
```

### 3) Configure Firestore

- Create a Firebase project
- Enable Firestore
- Download a Service Account Key and set backend environment variables

## Suggested Project Structure

```text
Spot-Me/
├─ README.md
├─ spot-me-web/          # React + Vite frontend
└─ spot-me-api/          # Express backend + Firestore
```

## API Design (MVP Example)

- `POST /api/profile`: create or update user preferences
- `GET /api/matches/:userId`: fetch matching results
- `GET /api/health`: health check

## Milestones (2-Hour Hackathon Version)

- **0-30 min**: Set up frontend/backend skeleton + Firestore connection
- **30-70 min**: Build form submission and data persistence
- **70-100 min**: Implement matching logic + results page
- **100-120 min**: Polish UI, add demo data, prepare demo flow

## Future Enhancements

- Real-time chat (Firebase / WebSocket)
- Finer-grained time slots (hour-level)
- Match explanation visualization (why this match was recommended)
- Filters and blocklist
- Map and distance-based weighting (LBS)

## License

MIT
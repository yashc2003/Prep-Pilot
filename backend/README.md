# Prep-Pilot Backend

Express + Mongoose backend for Prep-Pilot.

## Setup

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `.env.example` → `.env`
3. Start the API:
   - `npm run dev`

Health check:

- `GET http://localhost:5000/health`

## Database

Set `MONGODB_URI` to your MongoDB instance (local example):

- `mongodb://127.0.0.1:27017/preppilot`

Seed sample users:

- `npm run seed`

## Models

Collections follow a modular design:

- `users` (common authentication)
- `companies`, `jobs`
- `candidates`
- `colleges`
- `consultancies`
- `applications`
- `mock_interviews`, `questions`, `ai_evaluations`
- `interviews`
- `payments`
- `notifications`

See `backend/src/models/`.

## Compass

Compass-ready schema validation + sample documents:

- `backend/compass/validators/`
- `backend/compass/sample-data/`

## Auth

- Register: `POST /api/auth/register` (requires `name`, `email`, `password`, `confirmPassword`, `role`, `phone`)
- Login: `POST /api/auth/login` (requires `email`, `password`, `role`)

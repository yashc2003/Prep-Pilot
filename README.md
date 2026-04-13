# Prep-Pilot

## Backend (MongoDB)

Backend code lives in `backend/`.

Quick start:

1. `cd backend`
2. `npm install`
3. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` + `JWT_SECRET`
4. Seed sample data: `npm run seed`
5. Run API: `npm run dev`

Endpoints:

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login` (login uses `email + password + role`)
- `GET /api/me` (Bearer token)

MongoDB Compass helpers are in `backend/compass/`.

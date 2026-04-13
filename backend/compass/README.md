# MongoDB Compass (Schema + Sample Data)

This folder contains:

- `validators/*.validator.json`: MongoDB **collection validation** rules for each collection.
- `sample-data/*.json`: sample documents you can import into MongoDB using Compass (one file per collection).

## 1) Create database/collection

1. Open **MongoDB Compass**
2. Connect to your MongoDB server (example local URI): `mongodb://127.0.0.1:27017`
3. Create a database named `preppilot`
4. Create these collections:

- `users`
- `companies`
- `jobs`
- `candidates`
- `colleges`
- `consultancies`
- `applications`
- `mock_interviews`
- `questions`
- `ai_evaluations`
- `interviews`
- `payments`
- `notifications`

## 2) Import sample data

Import in this order (because some collections reference others):

1. `backend/compass/sample-data/users.json` → `users`
2. `backend/compass/sample-data/colleges.json` → `colleges`
3. `backend/compass/sample-data/companies.json` → `companies`
4. `backend/compass/sample-data/consultancies.json` → `consultancies`
5. `backend/compass/sample-data/candidates.json` → `candidates`
6. `backend/compass/sample-data/jobs.json` → `jobs`
7. `backend/compass/sample-data/applications.json` → `applications`
8. `backend/compass/sample-data/questions.json` → `questions`
9. `backend/compass/sample-data/mock_interviews.json` → `mock_interviews`
10. `backend/compass/sample-data/ai_evaluations.json` → `ai_evaluations`
11. `backend/compass/sample-data/interviews.json` → `interviews`
12. `backend/compass/sample-data/payments.json` → `payments`
13. `backend/compass/sample-data/notifications.json` → `notifications`

Compass steps (repeat per collection):

- Compass → `preppilot.<collection>` → **ADD DATA** → **Import File** → choose the file

## 3) Apply schema validation (optional but recommended)

For each collection:

Compass → `preppilot.<collection>` → **Validation** tab → **Add Rule** / **Update Rules**

Paste the contents of:

- `backend/compass/validators/<collection>.validator.json`

Then save.

## Notes

- MongoDB does not enforce foreign keys. References like `company_id` are stored as `ObjectId`s.
- Uniqueness like `users.email` is enforced by **indexes** (created by Mongoose when the backend runs), not by schema validation.

# SitePilot Backend

This folder contains a Node.js/Express backend skeleton for the SitePilot platform.

## Structure

- `models/` – Mongoose schemas for all collections (users, tenants, websites, etc.)
- `controllers/` – Business logic placeholders for each API group
- `routes/` – Express routers mapping endpoints to controllers
- `middleware/` – Shared middleware (authentication, validation, error handling)
- `config/` – Configuration helpers (database connection)
- `server.js` – Entry point that wires everything together

## Setup

1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies: `npm install`.
3. Start the server: `npm run dev`.

The code is mostly scaffolding; each controller method should be filled in with the actual logic derived from the API specification.

## Notes

- All APIs are prefixed with `/api/v1`.
- JWT is used for authentication; middleware is available at `middleware/auth.js`.
- MongoDB models reflect the detailed data models provided in the original specification.
- New endpoints allow storing the `index.html` content for a website and tracking multiple HTML versions:
  - `POST /api/v1/websites/:websiteId/html-versions` (body `{ html }`)
  - `GET /api/v1/websites/:websiteId/html-versions`
  - `GET /api/v1/websites/:websiteId/html-versions/:versionId`
  Deployment endpoint also accepts `html` to auto-create a version.

Enjoy building the backend!
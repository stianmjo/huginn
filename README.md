# Huginn

Huginn is a personal homepage and learning project.

It is split into:
- a **Next.js frontend** (App Router, TypeScript, Tailwind v4)
- an **Express backend** for API endpoints and file uploads

## Project setup

```text
.
├── backend/              # Express API service
├── frontend/             # Frontend Dockerfile
├── src/                  # Next.js app source
├── public/               # Static assets
└── docker-compose.yml    # Local multi-service setup
```

### Frontend
- Runs on `http://localhost:3000`
- Uses `NEXT_PUBLIC_BACKEND_URL` to talk to the backend

### Backend
- Runs on `http://localhost:8080`
- Main endpoints:
	- `GET /health`
	- `GET /api/ping`
	- `POST /api/ping`
	- `POST /api/upload`
- Serves uploaded files from `/uploads`

## Run locally

### Option 1: Docker Compose (recommended)

```bash
docker compose up --build
```

This starts both services:
- frontend on port `3000`
- backend on port `8080`

### Option 2: Run services manually

Backend:
```bash
cd backend
npm install
npm start
```

Frontend (from repo root, in a second terminal):
```bash
npm install
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080 npm run dev
```

## Docker images

The repository has separate frontend and backend images:
- `ghcr.io/stianmjo/huginn-frontend`
- `ghcr.io/stianmjo/huginn-backend`

Local builds:
```bash
# Frontend image
docker build -f frontend/Dockerfile -t huginn-frontend .

# Backend image
docker build -f backend/Dockerfile -t huginn-backend backend
```

## Notes

- Frontend backend URL helper is in `src/lib/backend-url.ts`.
- API routes are served by the backend service (not `src/app/api/*`).

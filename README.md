This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker images

The repository builds two separate images in two separate GitHub Actions workflows:

- `.github/workflows/publish-frontend.yml`
- `.github/workflows/publish-backend.yml`

Published images:

- `ghcr.io/<owner>/<repo>-frontend`
- `ghcr.io/<owner>/<repo>-backend`

Tags follow the same pattern for both images:

- `sha-<shortsha>` on every workflow run
- `vX.Y.Z` and `latest` when pushing a SemVer tag

Both workflows trigger on:

- `workflow_dispatch`
- pushes of tags matching `v*.*.*`

Local builds:

```bash
# Frontend (Next.js)
docker build -f frontend/Dockerfile -t huginn-frontend .

# Backend (Express)
docker build -f backend/Dockerfile -t huginn-backend backend
```

Frontend runtime config:

- Set `NEXT_PUBLIC_BACKEND_URL` to your backend base URL (example: `http://backend:8080` in container networks).
- The homepage Ping button now calls `<NEXT_PUBLIC_BACKEND_URL>/api/ping`.
- In GitHub Actions, set repository variable `NEXT_PUBLIC_BACKEND_URL` to inject this value into the frontend image build.
- All API endpoints have been migrated out of `src/app/api/*` and now run from the backend service.

Run locally (without Docker):

```bash
# terminal 1
cd backend && npm install && npm start

# terminal 2
npm install && NEXT_PUBLIC_BACKEND_URL=http://localhost:8080 npm run dev
```

Run locally (with Docker Compose):

```bash
docker compose up --build
```

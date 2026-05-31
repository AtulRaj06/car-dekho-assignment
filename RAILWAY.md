# Deploying to Railway

## Setup

1. Push this repo to GitHub
2. Create a new project on Railway → **Deploy from GitHub repo**
3. Railway auto-detects Next.js — no extra config needed

## Environment variables

Set in Railway dashboard → **Variables**:

```
DATABASE_URL=file:./dev.db
```

## Build command (auto-used via package.json)

```
prisma generate && prisma db push && node prisma/seed.js && next build
```

This runs on every deploy: generates the Prisma client, creates/syncs the SQLite schema, seeds the 20 cars, then builds Next.js.

> **Note:** SQLite data resets on each deploy since Railway's filesystem is ephemeral. For persistent data, swap SQLite for Railway's PostgreSQL add-on and update the Prisma schema provider to `postgresql`.

## Start command

```
next start
```

Railway sets `PORT` automatically — Next.js reads it.

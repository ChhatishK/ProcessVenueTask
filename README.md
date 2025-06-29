# Book Review Service – Express + TypeScript

A minimal REST micro‑service that lets you create **books** and **reviews**.  
Built with **Express 4**, **TypeORM**, **PostgreSQL**, **Redis** (cache), **Swagger UI**, and **Docker Compose** for easy local spin‑up.

---

## Table of Contents
1. [Prerequisites](#prerequisites)  
2. [Quick Start (Docker)](#quick-start-docker)  
3. [Environment Variables](#environment-variables)  
4. [Running Migrations](#running-migrations)  
5. [Dev Workflow](#dev-workflow)  
6. [Tests](#tests)  
7. [API Reference](#api-reference)  
8. [Troubleshooting FAQ](#troubleshooting-faq)

---

## Prerequisites
| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | ≥ 18 | TS/ESM support |
| **npm**     | ≥ 9  | comes with Node |
| **Docker Desktop** | latest | for Postgres + Redis containers |
| **Git** (optional) | | to clone the repo |

---

## Quick Start (Docker)
```bash
git clone <repo-url> book-review-service
cd book-review-service

# 1 Install Node deps
npm install

# 2 Spin up Postgres + Redis
docker compose up -d            # containers: db @5432, redis @6379

# 3 Copy env template and adjust if you changed ports / passwords
cp .env.example .env            # edit if needed

# 4 Create the database once
docker compose exec db psql -U postgres -c "CREATE DATABASE bookdb;"

# 5 Run migrations (creates tables + index)
npm run typeorm migration:run

# 6 Start dev server with auto‑reload
npm run dev                     # http://localhost:3000

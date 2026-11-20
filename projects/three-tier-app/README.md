# Three-Tier Docker Application

A containerized three-tier application built using Docker, Docker Compose, Nginx, Node.js, Express and PostgreSQL.

## Architecture

- **Frontend:** HTML, CSS, JavaScript and Nginx
- **Backend:** Node.js and Express REST API
- **Database:** PostgreSQL 17
- **Container orchestration:** Docker Compose
- **Reverse proxy:** Nginx
- **Persistent storage:** Docker named volume

## Features

- Add users through a web interface.
- Retrieve registered users through a REST API.
- Store user records in PostgreSQL.
- Connect services through a Docker bridge network.
- Use Nginx as a reverse proxy.
- Persist database data using Docker volumes.
- Configure PostgreSQL health checks.
- Manage services using Docker Compose.

## Project Structure

```text
three-tier-app/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── Dockerfile
    ├── index.html
    ├── style.css
    ├── app.js
    └── nginx.conf
```

## Prerequisites

- Docker Engine
- Docker Compose plugin

## Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Create local environment files based on `.env.example`.
4. Configure matching database credentials in both environment files.
5. Start the application:

```bash
docker compose up -d --build
```

## Access the application

Open:

```text
http://localhost:8085
```

API endpoints:

- `GET /api/users` — Retrieve all users.
- `POST /api/users` — Create a user.

Example request:

```bash
curl -X POST http://localhost:8085/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Mugil","email":"mugil@example.com"}'
```

## Useful Docker Commands

```bash
docker compose ps
docker compose logs -f
docker compose restart
docker compose down
```

**Note:** `docker compose down` preserves named volumes. Avoid `docker compose down -v` when you need to preserve database data.

## Learning Outcomes

- Docker images and containers
- Dockerfiles and image builds
- Docker networking and service discovery
- Docker named volumes
- Docker Compose
- PostgreSQL persistence
- Node.js REST APIs
- Nginx reverse proxy
- Environment variable management
- Container health checks

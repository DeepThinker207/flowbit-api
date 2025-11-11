# Flowbit API
- Simple backend service built with Node.js, Express, Prisma ORM, and PostgreSQL (Dockerized) for Flowbit’s analytics dashboard assignment.

- This API handles invoices, vendors, payments, and analytics routes like stats, category spend, invoice trends, and cash outflow.


## Features:
- REST API built with Express
- PostgreSQL via Docker
- Prisma ORM setup & schema modeling
- Seed scripts for inserting dummy data
- Analytics endpoints for dashboard:

- /stats

- /invoice-trends

- /category-spend

- /cash-outflow
✅ User routes (basic testing)
✅ Modular route structure
✅ Environment-based config using .env

## Tech Stack
| Component        |        Technology                      |
|------------------|----------------------------------------|
| Runtime          |        Node.js + TypeScript            |
| Framework        |        Express.js                      |
| Database         |        PostgreSQL (Docker)             |
| ORM              |        Prisma                          |
| Tools            |   Docker Compose, REST Client (VS Code)|



## Setup Instructions
1. Clone the Repository using following command:

  ```bash
  git clone https://github.com/<your-username>/flowbit-api.git
  cd flowbit-monorepo/apps/api
  ```

2. Start PostgreSQL via Docker
- Run this command to start the PostgreSQL container:
  ```bash
  docker compose up -d db
  ```

3. Default DB credentials (from docker-compose.yml):
- User: app
- Password: app
- Database: flowbit
- Port: 5432

4. Install Dependencies
```
npm install
```

5. Push Prisma Schema
```
npx prisma db push
```
. Run the Server
```
npm run dev
```

6. Server will start on:
```
http://localhost:3001
```

## Optional Tools
- To open the Prisma GUI:
```
npx prisma studio
```

- This opens:
```
http://localhost:5555
```


# Notes:
- The project currently includes backend APIs only.
- Frontend (Next.js + Tailwind + shadcn/ui) and Vanna AI integration can be added in later phases.
- This version focuses on API functionality and data correctness.

# Flowbit API
A simple backend built using Node.js, Express, Prisma ORM, and PostgreSQL (Dockerized).


## Features:
- REST API built with Express
- PostgreSQL database running in Docker
- Prisma ORM for managing schema and queries
- Endpoints for creating and fetching users
- Environment-based configuration using .env


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

This will create a PostgreSQL database with the following details:
- User: app
- Password: app
- Database: flowbit
- Port: 5432

3. Install Dependencies
- Run this command to install all required Node.js packages:
  ```bash
  npm install
  ```

4. Push Prisma Schema to Database
- Run this command to push the Prisma schema to the PostgreSQL database:
  ```bash
  npx prisma db push
  ```

5. Start the Server
- Run this command to start the backend server:
  ```bash
  npm run dev
  ```

- After running this command, the server will be available at:
  http://localhost:3001



## API Endpoints

### Create a New User
Run the following POST request:
POST → http://localhost:3001/users


### Body (JSON):
{
  "name": "Deepesh",
  "email": "deepesh@example.com"
}


### Get All Users
- Run the following GET request:
GET → http://localhost:3001/users


### Example Response:
[
  {
    "id": 1,
    "name": "Deepesh",
    "email": "deepesh@example.com",
    "createdAt": "2025-11-10T..."
  }
]



### Open Prisma Studio (Optional)

- Run this command to visually view and manage your database:
  ```bash
  npx prisma studio
  ```


- After running this command, open the following link in your browser:
http://localhost:5555


- Stop Containers
  After testing, run this command to stop and remove the Docker containers:
  ```bash
  docker compose down
  ```

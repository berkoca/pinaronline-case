# Pinaronline Case Study

A **RESTful API** that allows users to manage a reward points system.  
Built with **Node.js** and **Express.js**, the API enables users to earn points, check their balance, view their history, and redeem rewards.

---

## 🚀 Features

- **User Management**
  - Register, login, and view profile
- **Points Management**
  - Earn points for activities
  - Check balance & transaction history
  - Redeem points for rewards
- **Reward Management**
  - View available rewards
  - Get reward details
  - Claim rewards with points
- **Security**
  - JWT-based authentication
  - Password hashing
  - Input validation
  - Rate limiting
- **Extras**
  - Expiring points

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT
- **Documentation:** SwaggerUI + Postman Collection
- **Testing:** Jest

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/berkoca/pinaronline-case.git
   cd reward-points-api
   ```

2. Make sure you have docker installed on your system.

   ```bash
   https://docs.docker.com/engine/install
   ```

3. Run Docker Compose command to start postgres and the app:

   ```env
   docker compose up --build -d
   ```

4. Now you can access the api (localhost:3000/api/v1) or SwaggerUI (localhost:3000/docs).

---

## 🔑 API Endpoints

### Users

- `POST /api/v1/users/register` → Register a new user
- `POST /api/v1/users/login` → Login & get token
- `GET /api/v1/users/profile` → View profile

### Points

- `GET /api/v1/points/balance` → Get current balance
- `GET /api/v1/points/history` → Get points history
- `POST /api/v1/points/earn` → Earn points
- `POST /api/v1/points/redeem` → Redeem points

### Rewards

- `GET /api/v1/rewards` → List available rewards
- `GET /api/v1/rewards/:id` → Get reward details
- `POST /api/v1/rewards/claim` → Claim a reward

---

## 🗄️ Data Models

### User

```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "password": "hashed",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Point

```json
{
  "id": "number",
  "userId": "string",
  "type": "earn | redeem",
  "amount": "number",
  "description": "string",
  "createdAt": "date"
}
```

### Reward

```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "pointsCost": "number",
  "isActive": "boolean",
  "stock": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## ✅ Testing

Run unit and integration tests after starting the Postgres and app with docker compose with this command:

```bash
npm test
```

---

## 📖 Documentation

Swagger / OpenAPI documentation will be available at:

```
http://localhost:3000/docs
```

---

## 📌 Deliverables

- Fully functional API
- Swagger / OpenAPI docs
- Database schema design
- Unit & integration tests
- Postman (or similar) collection

---

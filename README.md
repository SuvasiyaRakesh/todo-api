# 📝 To-Do List API

A **backend API** for managing personal tasks, built using **Node.js**, **Express**, **PostgreSQL**, **JWT Authentication**, and **Cron Jobs**.
This API enables user registration, secure login, and full CRUD operations on tasks. Each user manages their own task list, and a scheduled job checks for newly created tasks every 5 minutes.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Create / Read / Update / Delete Tasks (CRUD)
* Each user can access only their own tasks
* Cron Job runs every 5 minutes to detect new tasks
* Sends email notifications or logs messages
* Passwords securely hashed using **bcrypt**
* Integrated with **PostgreSQL** database
* Fully testable via **Postman**

---

## 🛠 Technologies Used

| Tool                     | Purpose                |
| ------------------------ | ---------------------- |
| **Node.js / Express.js** | Backend Framework      |
| **PostgreSQL**           | Database               |
| **bcrypt**               | Password Hashing       |
| **JWT**                  | Authentication         |
| **node-cron**            | Scheduled Task Checker |
| **dotenv**               | Environment Variables  |

---

## 📦 Project Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-url>
cd todo-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the project root with the following variables:

```
PORT=3000
DATABASE_URL=postgresql://todo_user:rakesh123@127.0.0.1:5432/todo_db
JWT_SECRET=your_jwt_secret
EMAIL_USER=rakeshsuwasiya51@gmail.com
EMAIL_PASS=poyv ihjd qsyq cdxs
```

> ⚙️ Update the credentials based on your PostgreSQL setup (e.g., EC2 instance).

---

## 🗄️ Database Setup (PostgreSQL)

### Create Database

```sql
CREATE DATABASE todo_db;
```

### Create Tables

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);
```

---

## 🏁 Start the Server

Run the server using either command:

```bash
npm run dev
```

or

```bash
node src/server.js
```

Server will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Folder Structure

```
todo-api/
 ├─ .env
 ├─ package.json
 ├─ README.md
 └─ src/
     ├─ app.js
     ├─ server.js
     ├─ config/
     │    └─ db.js
     ├─ controllers/
     │    ├─ authController.js
     │    └─ taskController.js
     ├─ jobs/
     │    └─ taskChecker.js
     ├─ middleware/
     │    └─ authMiddleware.js
     ├─ models/
     │    ├─ userModel.js
     │    └─ taskModel.js
     └─ routes/
          ├─ authRoutes.js
          └─ taskRoutes.js
```

---

## 🧪 API Usage (via Postman)

### 🔐 Authentication Endpoints

| Method   | Endpoint             | Description                 | Body Example                                 |
| -------- | -------------------- | --------------------------- | -------------------------------------------- |
| **POST** | `/api/auth/register` | Register a new user         | `{ "username": "test", "password": "1234" }` |
| **POST** | `/api/auth/login`    | Login and receive JWT token | `{ "username": "test", "password": "1234" }` |

After successful login, copy the token and include it in headers as:

```
Authorization: Bearer <your_token_here>
```

---

### 📝 Task Endpoints (Require JWT Auth)

| Method     | Endpoint         | Description                      | Body Example                                          |
| ---------- | ---------------- | -------------------------------- | ----------------------------------------------------- |
| **POST**   | `/api/tasks`     | Create a new task                | `{ "title": "Task title", "description": "Details" }` |
| **GET**    | `/api/tasks`     | Get all tasks for logged-in user | —                                                     |
| **GET**    | `/api/tasks/:id` | Get a specific task              | —                                                     |
| **PUT**    | `/api/tasks/:id` | Update a task                    | `{ "title": "New title", "description": "Updated" }`  |
| **DELETE** | `/api/tasks/:id` | Delete a task                    | —                                                     |

---

## ⏱️ Cron Job

* Runs automatically **every 5 minutes**
* Located at: `src/jobs/taskChecker.js`
* Detects newly created tasks
* Sends email notifications or logs reminder messages

---

## ⚠️ Error Handling

| Status  | Reason                       |
| ------- | ---------------------------- |
| **400** | Missing required fields      |
| **401** | Unauthorized / Invalid Token |
| **404** | Task not found               |
| **500** | Server error                 |

**Example Error Response:**

```json
{ "message": "Title is required" }
```

---

## 🧑‍💻 Author

**Rakesh Suvasiya**
Backend Developer (Node.js | PostgreSQL | AWS)


# To-Do Task Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks with authentication.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Modules Overview](#modules-overview)
  - [Backend](#backend)
    - [server.js](Backend/server.js)
    - [controllers/](Backend/controllers/)
    - [models/](Backend/models/)
    - [middleware/](Backend/middleware/)
    - [routes/](Backend/routes/)
  - [Frontend](#frontend)
    - [src/App.js](frontend/src/App.js)
    - [src/api.js](frontend/src/api.js)
    - [src/components/](frontend/src/components/)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Execution](#execution)
- [Environment Variables](#environment-variables)

---

## Project Structure

```
.
├── Backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
    ├── package.json
    ├── public/
    └── src/
```

---

## Modules Overview

### Backend

#### [server.js](Backend/server.js)

- Entry point for the backend server.
- Connects to MongoDB, sets up Express, CORS, and JSON parsing.
- Mounts user and task routes.

#### [controllers/](Backend/controllers/)

- **[userController.js](Backend/controllers/userController.js):** Handles user registration and login, including JWT token generation.
- **[taskController.js](Backend/controllers/taskController.js):** Handles CRUD operations for tasks, ensuring actions are user-specific.

#### [models/](Backend/models/)

- **[User.js](Backend/models/User.js):** Mongoose schema for users (email, password).
- **[Task.js](Backend/models/Task.js):** Mongoose schema for tasks (name, completed, user reference).

#### [middleware/](Backend/middleware/)

- **[auth.js](Backend/middleware/auth.js):** Express middleware to verify JWT tokens and attach the user to the request.

#### [routes/](Backend/routes/)

- **[user.js](Backend/routes/user.js):** User registration and login endpoints.
- **[task.js](Backend/routes/task.js):** Task CRUD endpoints, protected by authentication.

---

### Frontend

#### [src/App.js](frontend/src/App.js)

- Main React component.
- Handles routing, authentication state, and task management logic.

#### [src/api.js](frontend/src/api.js)

- Axios instance configured with backend base URL and JWT token interceptor.

#### [src/components/](frontend/src/components/)

- **[AuthForm.js](frontend/src/components/AuthForm.js):** Login and registration form.
- **[TaskForm.js](frontend/src/components/TaskForm.js):** Form to add new tasks.
- **[TaskList.js](frontend/src/components/TaskList.js):** Displays the list of tasks with toggle and delete options.

---

## Installation

### Backend Setup

1. **Navigate to the Backend directory:**

   ```sh
   cd Backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env` or create one based on `.env.example` (if available).
   - Example:
     ```
     MONGO_URI=mongodb://localhost:27017/to-do-task
     JWT_SECRET=your_jwt_secret
     PORT=3001
     ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   - The backend will run on `http://localhost:3001`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend development server:**
   ```sh
   npm start
   ```
   - The frontend will run on `http://localhost:3000`.

---

## Execution

1. **Start MongoDB** (if not already running):

   - For local development, run `mongod` in your terminal.

2. **Start the backend server** (see Backend Setup above).

3. **Start the frontend server** (see Frontend Setup above).

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```
   - Register a new user or log in.
   - Add, complete, or delete tasks.

---

## Environment Variables

- **Backend [.env](Backend/.env):**
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT token signing.
  - `PORT`: Port for backend server (default: 3001).

---

## Notes

- Ensure both backend and frontend servers are running for full functionality.
- The frontend communicates with the backend via REST API endpoints.
- JWT tokens are stored in `localStorage` for authentication.

---

## License

MIT

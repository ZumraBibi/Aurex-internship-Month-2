# Full-Stack Authenticated Task Manager Dashboard

A modern, secure, and production-ready full-stack Task Management application built using the **MERN (MongoDB, Express, React, Node.js)** architecture. This project satisfies all operational specifications for the Month 2 Engineering Evaluation, incorporating component-driven UI design, client-side dynamic state updates, a RESTful CRUD API service, data isolation layers, and secure **JSON Web Token (JWT)** session validation.

## 🚀 Key Features
- **Task 1 (Modular UI):** Completely responsive, user-friendly frontend built with reusable React functional components and styled using elegant modern token frameworks.
- **Task 2 (Async State Management):** Smooth handling of asynchronous loading sequences, graceful error rollbacks, search queries, and dynamic status tab categorization.
- **Task 3 (Robust backend):** Fully structured Node/Express server engineered around Model-Controller-Route design principles linked directly to a cloud cluster.
- **Task 4 (Secured Data Isolation):** Complete profile privacy protected through `bcryptjs` cryptography hashing mechanisms and verified JSON Web Token entry verification checks.

---

## 📂 Project Directory Structure

```text
📁 fullstack-task-manager/
├── 📁 frontend/               # React User Interface Root
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable View Layer Components
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📄 TaskForm.jsx
│   │   │   ├── 📄 TaskList.jsx
│   │   │   └── 📄 TaskItem.jsx
│   │   ├── 📄 App.jsx         # App Engine Matrix & State Handlers
│   │   ├── 📄 main.jsx        # React DOM Root Mounting Script
│   │   └── 📄 App.css         # Custom Styled UI Presentation
│   └── 📄 package.json
│
├── 📁 backend/                # Node.js/Express REST API Engine
│   ├── 📁 config/             # Database Driver Mongoose Connection Setup
│   │   └── 📄 db.js
│   ├── 📁 controllers/        # Logical API Execution Controllers
│   │   ├── 📄 taskController.js
│   │   └── 📄 userController.js
│   ├── 📁 middleware/         # Security Route Interceptors & Token Verification
│   │   └── 📄 authMiddleware.js
│   ├── 📁 models/             # Schema Configurations for Collections
│   │   ├── 📄 Task.js
│   │   └── 📄 User.js
│   ├── 📁 routes/             # Path Entry Point Mapping Handlers
│   │   ├── 📄 taskRoutes.js
│   │   └── 📄 userRoutes.js
│   ├── 📄 server.js           # Server Shell Initialization File
│   └── 📄 .env                # Protected Environment Configuration Scope
└── 📄 README.md               # Main Project Documentation File
```

---

## 📊 Database Schema Summaries

The system uses **MongoDB Atlas** with two highly integrated data schemas connected via references to guarantee strict user-level data isolation.

### 1. User Schema (`models/User.js`)
Stores user registration data and automatically executes secure one-way password hashing via a `pre-save` hook using `bcryptjs`.
```javascript
{
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  timestamps: true // Automatically tracks createdAt and updatedAt
}
```

### 2. Task Schema (`models/Task.js`)
Each task entry is securely locked down to its owner's account ID via a relational schema reference hook.
```javascript
{
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  timestamps: true
}
```

---

## 🛰️ API Endpoint Documentation

All `/api/tasks` endpoints are wrapped with custom token verification middleware (`protect`). Any request passing without a valid `Bearer <Token>` string inside the HTTP Authorization header will be automatically blocked with a `401 Unauthorized` status response.

### 🔐 Authentication Routes (`/api/users`)

| Method | Endpoint | Access | Body Payload | Success Response (200/201) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/users/register` | Public | `{ "username": "user", "password": "pass" }` | `{ "_id": "...", "username": "...", "token": "JWT" }` |
| **POST** | `/api/users/login` | Public | `{ "username": "user", "password": "pass" }` | `{ "_id": "...", "username": "...", "token": "JWT" }` |

### 📝 Task Operations Routes (`/api/tasks`)

| Method | Endpoint | Access | Header Requirements | Body Payload / Action |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Private | `Authorization: Bearer <Token>` | Fetches user-specific task lists |
| **POST** | `/api/tasks` | Private | `Authorization: Bearer <Token>` | `{ "text": "New Task Document" }` |
| **PUT** | `/api/tasks/:id` | Private | `Authorization: Bearer <Token>` | `{ "completed": true }` (Toggles status) |
| **DELETE**| `/api/tasks/:id` | Private | `Authorization: Bearer <Token>` | Purges specific task entry from MongoDB |

---

## 🛠️ Step-by-Step Installation & Local Execution

Follow these steps to launch both project layers inside your local development terminal environment.

### Prerequisites
- Make sure you have **Node.js** (v16+) installed.
- Access to a running terminal interface instance or **Developer PowerShell** tabs in Visual Studio.

### 1. Backend Server Setup
1. Move down into the backend directory folder path window shell scope:
   ```bash
   cd backend
   ```
2. Install the necessary system packages and tools:
   ```bash
   npm install
   ```
3. Create your local **`.env`** file directly in the root of the backend folder and populate it with your specific credentials:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.qfczn0f.mongodb.net/taskmanager?retryWrites=true&w=majority
   JWT_SECRET=mySuperSecretSignatureKey123!
   ```
4. Fire up the development listener server with automated change re-trigger hooks:
   ```bash
   npm run dev
   ```
   *Expected Output Logs:*
   `🛰️ Secure server running successfully on port 5000`  
   `🚀 MongoDB Atlas Connected: cluster0...`

### 2. Frontend Application Setup
1. Open a **new separate terminal tab** right next to the running backend engine.
2. Ensure you are at the project root level, then install the front-end configurations and script layouts:
   ```bash
   npm install
   ```
3. Run the fast front-end compilation engine to spin up your interface shell:
   ```bash
   npm run dev
   ```
4. Copy the localized development routing web-address provided in the server console output text stream (usually `http://localhost:5173`) and open it in your browser.

---

## 📝 Conceptual Understanding Verification Check
- **Password Hashing Protection:** Clear text data strings are captured directly at the endpoint request layer and securely transformed into irreversible cryptic hashes prior to being saved to cloud indexes.
- **Route Authorization Safeguards:** The interface intercepts user browser inputs, packaging active session identity tokens securely inside automated request structures. The secure backend routing middleware validates these tokens before processing any task creation, completion, or deletion operations.

# 🎓 Student CRUD Fullstack Application

A production-ready Fullstack Student Management Application featuring a **Spring Boot (Java 21) + PostgreSQL** REST API backend and a modern **Vite + React 19 + Tailwind CSS v4** frontend designed with an inline **No-Modal Dashboard**.

* **Repository:** [https://github.com/naithhhua/student-crud](https://github.com/naithhhua/student-crud)
* **Author:** naithhhua (`jntnonog.student@ua.edu.ph`)
* **Branch:** `main`

---

## 📌 Project Architecture & Summary

```
student-crud/
├── src/main/java/com/nonog/student/
│   ├── Student.java                 # JPA Entity (id, firstname, lastname, course, section)
│   ├── StudentController.java       # REST Controller mapped to /nonog/students with @CrossOrigin
│   ├── StudentRepository.java       # Spring Data JPA Repository
│   └── StudentApplication.java      # Spring Boot application entry point
├── src/main/resources/
│   └── application.properties       # Dynamic PostgreSQL config (Render env vars + local fallback)
├── frontend/                        # Vite + React + Tailwind CSS frontend
│   ├── src/
│   │   ├── api/studentService.js    # API client supporting local proxy & VITE_API_BASE_URL
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Header with real-time student count and refresh
│   │   │   ├── StudentForm.jsx      # Inline Add / Edit form (No modal)
│   │   │   ├── StudentTable.jsx     # Responsive student records table with search
│   │   │   ├── InlineDeleteAction.jsx # 2-step inline delete confirmation (No modal)
│   │   │   └── NotificationToast.jsx  # Non-blocking floating status alerts
│   │   ├── App.jsx                  # Main dashboard coordinator
│   │   ├── index.css                # Tailwind CSS v4 setup
│   │   └── main.jsx                 # React root
│   ├── vite.config.js               # Dev proxy configured for /nonog -> localhost:8080
│   └── package.json                 # React 19, Vite 8, Tailwind v4, Lucide React
├── Dockerfile                       # Multi-stage Docker build (Eclipse Temurin Java 21)
├── .dockerignore                    # Excludes target, node_modules, .git for fast builds
└── render.yaml                      # Render.com Infrastructure-as-Code Blueprint
```

---

## 📡 API Contract

Base Path: `/nonog/students`

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/nonog/students` | None | Retrieve all student records |
| `GET` | `/nonog/students/{id}` | None | Retrieve a single student by ID |
| `POST` | `/nonog/students` | `{ firstname, lastname, course, section }` | Create a new student |
| `PUT` | `/nonog/students/{id}` | `{ firstname, lastname, course, section }` | Update student details |
| `DELETE` | `/nonog/students/{id}` | None | Delete student by ID |

---

## 💻 How to Run on a New Computer

### 1. Prerequisites
* **Java 21 JDK** installed
* **Node.js (v20 or v22+) & npm** installed
* **PostgreSQL** running locally (or use Render PostgreSQL credentials)

### 2. Clone the Repository
```bash
git clone https://github.com/naithhhua/student-crud.git
cd student-crud
```

### 3. Run the Backend (Terminal 1)
Make sure your PostgreSQL database exists (default `db_student` or adjust in `application.properties`).

* **Windows:**
  ```powershell
  .\mvnw.cmd spring-boot:run
  ```
* **macOS / Linux:**
  ```bash
  chmod +x mvnw
  ./mvnw spring-boot:run
  ```
*Backend starts on `http://localhost:8080`.*

### 4. Run the Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
*Frontend starts on `http://localhost:5173`.*

---

## ☁️ Deployment on Render.com

The project includes a ready-to-use [`render.yaml`](./render.yaml) blueprint:

1. Log into [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Blueprint**.
3. Connect your repository: `naithhhua/student-crud`.
4. Render will automatically read `render.yaml` and provision:
   * **`student-db`**: Free managed PostgreSQL database
   * **`student-backend`**: Docker Web Service running the Spring Boot API
   * **`student-frontend`**: Static Site hosting the Vite React app
5. Click **Apply**.
6. If Render gives your backend a unique domain (e.g. `https://student-backend-xxxx.onrender.com`), go to **student-frontend** $\rightarrow$ **Environment** and set `VITE_API_BASE_URL` to that URL.

---

## 🤖 Context for AI Assistants (Resume on Another Machine)

If you open this project with Antigravity / Gemini CLI on another computer, you can paste this prompt:

```text
I am continuing work on this student-crud repository (Spring Boot 4.x / Java 21 + Vite React 19 + Tailwind CSS).
The backend API is at /nonog/students with CORS enabled.
The frontend is in ./frontend with an inline no-modal design.
A Render blueprint (render.yaml) and Dockerfile are already set up.
Please inspect the codebase and ask how I'd like to proceed.
```

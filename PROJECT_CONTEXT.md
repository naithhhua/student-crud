# 📋 Project Context & Handover Summary

> **Saved On:** November 5, 2026  
> **Repository:** https://github.com/naithhhua/student-crud  
> **Branch:** `main`  
> **Author:** naithhhua (jntnonog.student@ua.edu.ph)

---

## 1. Project Background & Stack

This repository is a full-stack CRUD application for managing Student records.

* **Backend**:
  * Spring Boot 4.1.1, Java 21
  * Spring Data JPA + Hibernate
  * PostgreSQL database driver
  * Rest Controller: `com.nonog.student.StudentController` mapped at `/nonog/students`
  * CORS: `@CrossOrigin(origins = "*")` configured for cross-origin access
  * Ports: Dynamic `PORT` environment variable support (Render default) with fallback to `8080`
  * Datasource: Dynamic DB host/credentials support via environment variables with local fallbacks
* **Frontend**:
  * Scaffolding: Vite 8 + React 19 (JavaScript)
  * Styling: Tailwind CSS v4 (`@tailwindcss/vite`)
  * Icons: `lucide-react`
  * Design: **Strictly No-Modal** (Inline 2-column split dashboard)
    * Left card: Add/Edit student form with real-time validation and edit cancel button
    * Right card: Student directory table with client-side search across all fields
    * Action column: Inline 2-step delete (`[Delete?] [Yes] [Cancel]`), zero popups
    * Floating non-blocking toast notifications
  * API Layer: `frontend/src/api/studentService.js` (uses Vite proxy `/nonog` locally and `VITE_API_BASE_URL` in production)
* **DevOps / Cloud (Render.com)**:
  * `render.yaml`: Blueprint for free-tier PostgreSQL (`student-db`), Docker Web Service (`student-backend`), and Static Site (`student-frontend`).
  * `Dockerfile`: Multi-stage build with `eclipse-temurin:21-jdk-alpine` (Maven build) and `eclipse-temurin:21-jre-alpine` (runtime).
  * `.dockerignore`: Prevents node_modules, dist, and target from entering the Docker build context.

---

## 2. File Index & Locations

| File | Purpose |
| :--- | :--- |
| `src/main/java/com/nonog/student/Student.java` | JPA entity with `id`, `firstname`, `lastname`, `course`, `section` |
| `src/main/java/com/nonog/student/StudentController.java` | Endpoints: `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` with `@CrossOrigin` |
| `src/main/java/com/nonog/student/StudentRepository.java` | Spring Data repository interface extending `CrudRepository` |
| `src/main/resources/application.properties` | PostgreSQL configuration with Render env vars (`${DB_HOST}`, `${PORT}`, etc.) |
| `Dockerfile` | Multi-stage Docker build for Java 21 Spring Boot |
| `render.yaml` | Render blueprint infrastructure specification |
| `frontend/src/App.jsx` | Main dashboard coordinator with connectivity check and dual-panel layout |
| `frontend/src/components/StudentForm.jsx` | Dual-mode Add/Edit form with field validation |
| `frontend/src/components/StudentTable.jsx` | Responsive table with search filtering and edit highlighting |
| `frontend/src/components/InlineDeleteAction.jsx` | 2-step inline delete confirmation (no modal) |
| `frontend/src/components/NotificationToast.jsx` | Non-blocking toast feedback |
| `frontend/src/api/studentService.js` | Fetch API client with `VITE_API_BASE_URL` support |
| `frontend/vite.config.js` | Vite config with Tailwind v4 plugin and `/nonog` proxy to `http://localhost:8080` |

---

## 3. How to Resume on Another Computer

1. **Clone the repository**:
   ```bash
   git clone https://github.com/naithhhua/student-crud.git
   cd student-crud
   ```
2. **Backend**:
   ```bash
   # Windows:
   .\mvnw.cmd spring-boot:run

   # macOS / Linux:
   chmod +x mvnw
   ./mvnw spring-boot:run
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 4. One-Liner AI Prompt for Another Computer

Copy and paste this into Antigravity or any AI assistant on your new machine:

> *"I am working on the student-crud repository (Spring Boot 4 / Java 21 + Vite React 19 + Tailwind CSS). Please read `PROJECT_CONTEXT.md` to get up to speed with the project structure and let me know when you're ready."*

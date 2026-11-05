# Student CRUD Frontend (Vite + React + Tailwind CSS)

Modern, responsive, **no-modal** frontend interface for the Student CRUD Spring Boot API.

---

## 🚀 Features

* **Vite + React (JavaScript)**: Ultra-fast dev server with HMR.
* **Tailwind CSS v4**: Utility-first styling with modern clean UI.
* **No Modals (Inline Dashboard Layout)**:
  * **Add / Edit Form Card**: Side-by-side split view. Clicking "Edit" on any row populates the form in-place and focuses the inputs.
  * **Inline Delete**: Clicking delete switches the table row to an inline `[Confirm?] [Yes] [Cancel]` prompt without interrupting modal overlays.
* **Live Search & Filter**: Real-time filtering across name, course, section, and ID.
* **Vite Proxy**: Pre-configured reverse proxy to `http://localhost:8080/nonog` to prevent CORS issues.
* **Non-blocking Toast Alerts**: Visual notifications for create, update, delete, and connection states.

---

## 🛠️ How to Run

### 1. Start the Spring Boot Backend (Terminal 1)
In the project root directory:
```bash
.\mvnw.cmd spring-boot:run
```
*(Backend runs on `http://localhost:8080`)*

### 2. Start the Vite React Frontend (Terminal 2)
In the `frontend` directory:
```bash
cd frontend
npm run dev
```
*(Frontend runs on `http://localhost:5173`)*

---

## 📡 API Contract

| HTTP Method | Backend Endpoint | Function |
| :--- | :--- | :--- |
| `GET` | `/nonog/students` | Get all students |
| `GET` | `/nonog/students/{id}` | Get student by ID |
| `POST` | `/nonog/students` | Create new student |
| `PUT` | `/nonog/students/{id}` | Update student by ID |
| `DELETE` | `/nonog/students/{id}` | Delete student by ID |

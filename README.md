# User Management System

## Project Overview

User Management System is a full-stack web application built with Spring Boot 3.4.1 on the backend and Angular 21 with Angular Material on the frontend.

The application allows users to securely log in and manage user records through a simple and responsive interface. It includes token-based authentication, route protection, and complete CRUD (Create, Read, Update, Delete) functionality.

This project was developed as a learning exercise to understand Java Spring Boot and Angular while following a clean layered architecture and modern development practices.

---

## Features

- User Login with UUID token-based authentication
- Protected routes using Angular Functional Auth Guard
- Create User with form validation
- Edit User with pre-filled form data
- Delete User with confirmation dialog
- User List using Angular Material Table
- Form validation on both frontend (template-driven) and backend (Jakarta Bean Validation)
- Global exception handling with proper HTTP status codes
- HTTP Interceptor for automatic Authorization header
- H2 in-memory database with seed data (10 users)
- SnackBar notifications for success and error messages
- Loading spinners during async operations
- 404 Page Not Found for invalid routes

---

## Technology Stack

### Backend

| Technology | Version |
|---|---|
| Java | 21 |
| Spring Boot | 3.4.1 |
| Spring Web | (included via spring-boot-starter-web) |
| Spring Data JPA | (included via spring-boot-starter-data-jpa) |
| Bean Validation (Jakarta) | (included via spring-boot-starter-validation) |
| H2 Database | 2.3.232 |
| Lombok | (optional, compile-time only) |
| Maven | (via Maven Wrapper) |

### Frontend

| Technology | Version |
|---|---|
| Angular | 21.2 |
| Angular Material | 21.2 |
| TypeScript | 5.9 |
| RxJS | 7.8 |
| Express (SSR) | 5.1 |

### Development Tools

- Node.js 20+
- npm 10+
- Git
- VS Code / IntelliJ IDEA

---

## Project Structure

```
UserManagement/
│
├── backend/
│   ├── src/main/java/com/usermanagement/
│   │   ├── UserManagementApplication.java        # App entry + seed data
│   │   ├── controller/
│   │   │   ├── AuthController.java               # POST /api/auth/login
│   │   │   └── UserController.java               # CRUD /api/users
│   │   ├── service/
│   │   │   ├── UserService.java                  # Service interface
│   │   │   └── impl/UserServiceImpl.java         # Service implementation
│   │   ├── repository/
│   │   │   └── UserRepository.java               # JPA repository
│   │   ├── entity/
│   │   │   └── User.java                         # JPA entity with validation
│   │   ├── dto/
│   │   │   ├── LoginRequest.java                 # Login request DTO
│   │   │   └── LoginResponse.java                # Login response DTO
│   │   ├── enums/
│   │   │   └── Role.java                         # ADMIN, USER
│   │   ├── exception/
│   │   │   ├── ResourceNotFoundException.java    # 404 exception
│   │   │   ├── DuplicateResourceException.java   # 409 exception
│   │   │   └── GlobalExceptionHandler.java       # @RestControllerAdvice
│   │   └── config/
│   │       └── CorsConfig.java                   # CORS for localhost:4200
│   └── src/main/resources/
│       └── application.properties                # H2, JPA, server config
│
└── frontend/
    └── src/app/
        ├── app.ts                                # Root component
        ├── app.config.ts                         # Providers (HTTP, router, animations)
        ├── app.routes.ts                         # Route definitions
        ├── components/
        │   ├── toolbar/                          # Top navbar with logout
        │   └── delete-dialog/                    # Delete confirmation dialog
        ├── pages/
        │   ├── login/                            # Login page
        │   ├── users-list/                       # User list table
        │   ├── user-form/                        # Create/edit user form
        │   └── page-not-found/                   # 404 page
        ├── services/
        │   ├── auth.ts                           # AuthService (login)
        │   └── user.ts                           # UserService (CRUD)
        ├── guards/
        │   └── auth.guard.ts                     # Route protection
        ├── interceptors/
        │   └── auth.interceptor.ts               # Bearer token header
        ├── models/
        │   ├── user.model.ts                     # User interface
        │   ├── login-request.model.ts            # LoginRequest interface
        │   └── login-response.model.ts           # LoginResponse interface
        └── layouts/
            └── main-layout/                      # Wrapper with toolbar + router-outlet
```

---

## Prerequisites

- Java 21
- Node.js 20+
- npm
- Git

---

## Running the Project

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:
```bash
cd backend
mvnw.cmd spring-boot:run
```

Backend runs on: `http://localhost:8080`

H2 Console: `http://localhost:8080/h2-console`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:4200`

The frontend uses an Angular proxy (`proxy.conf.json`) that forwards all `/api/*` requests to the backend at `http://localhost:8080`.

---

## Login Credentials

| Username | Password |
|----------|----------|
| admin    | admin123 |

Credentials are hardcoded in `AuthController.java`. There is no user registration.

---

## API Endpoints

### Authentication

| Method | Endpoint | Request Body | Success Response | Error Response |
|--------|----------|-------------|-----------------|----------------|
| POST | `/api/auth/login` | `{ "username": "admin", "password": "admin123" }` | `200 OK` — `{ "token": "<uuid>", "message": "Login Successful" }` | `401 UNAUTHORIZED` — `{ "token": null, "message": "Invalid Username or Password" }` |

### Users

| Method | Endpoint | Request Body | Success Response | Error Responses |
|--------|----------|-------------|-----------------|-----------------|
| GET | `/api/users` | — | `200 OK` — `[ { user1 }, { user2 }, ... ]` | — |
| GET | `/api/users/{id}` | — | `200 OK` — `{ user }` | `404 NOT_FOUND` |
| POST | `/api/users` | `{ "firstName", "lastName", "email", "role", "active" }` | `201 CREATED` — `{ user }` | `400 BAD_REQUEST`, `409 CONFLICT` |
| PUT | `/api/users/{id}` | `{ "firstName", "lastName", "email", "role", "active" }` | `200 OK` — `{ user }` | `400 BAD_REQUEST`, `404 NOT_FOUND`, `409 CONFLICT` |
| DELETE | `/api/users/{id}` | — | `204 NO_CONTENT` | `404 NOT_FOUND` |

---

## Seed Data

On application startup, 10 users are automatically inserted into the H2 database:

| ID | Name | Email | Role | Active |
|----|------|-------|------|--------|
| 1 | User 1 | user1@example.com | ADMIN | true |
| 2 | User 2 | user2@example.com | USER | true |
| 3 | User 3 | user3@example.com | USER | true |
| 4 | User 4 | user4@example.com | USER | true |
| 5 | User 5 | user5@example.com | USER | true |
| 6 | User 6 | user6@example.com | USER | true |
| 7 | User 7 | user7@example.com | USER | true |
| 8 | User 8 | user8@example.com | USER | true |
| 9 | User 9 | user9@example.com | USER | true |
| 10 | User 10 | user10@example.com | USER | true |

Seeding is skipped if data already exists (checked via `repository.count()`).

---

## Authentication Flow

1. User navigates to `/login` and enters credentials.
2. Frontend sends `POST /api/auth/login` with `{ username, password }`.
3. Backend validates against hardcoded credentials (`admin` / `admin123`).
4. On success, backend returns a UUID token.
5. Frontend stores the token in `localStorage`.
6. HTTP Interceptor (`authInterceptor`) reads the token from `localStorage` and attaches `Authorization: Bearer <token>` to every outgoing request.
7. Auth Guard (`authGuard`) checks for the token's existence before allowing access to `/users` routes. If no token, the user is redirected to `/login`.
8. Logout removes the token from `localStorage` and navigates to `/login`.

> **Note:** The backend does not validate the Bearer token. Authentication is enforced client-side by the Auth Guard.

---

## Key Design Decisions

### Auth Guard

Angular Functional Auth Guard (`CanActivateFn`) is used because it is the recommended approach in Angular 21. It is simple, lightweight, and reads the token from `localStorage`.

### Token Storage

The authentication token is stored in `localStorage`. This allows the user to stay logged in after a page refresh until they explicitly log out.

### Angular Proxy

A proxy configuration (`proxy.conf.json`) forwards all `/api/*` requests from the Angular dev server (`localhost:4200`) to the Spring Boot backend (`localhost:8080`). This avoids CORS issues during development.

### HTTP Interceptor

An HTTP Interceptor (`authInterceptor`) automatically adds the `Authorization: Bearer <token>` header to every outgoing HTTP request when a token exists in `localStorage`.

---

## Coming from Laravel/PHP

Coming from Laravel, learning Spring Boot and Angular was a different experience because the project structure and development style are different. At the beginning, it was difficult to understand how everything worked together and how data moved between the frontend and backend.

Instead of trying to learn everything at once, I built the project step by step. I first created the backend APIs, then connected the database, added authentication, and finally integrated the Angular frontend. Working on one feature at a time made the project easier to understand.

Whenever I got stuck, I read the official documentation. I also used AI to explain concepts in simple language so I could understand the logic instead of simply copying code.

This project helped me become more comfortable with Java Spring Boot and Angular. It also improved my understanding of layered architecture, REST APIs, authentication, and frontend-backend communication. Although I still have more to learn, completing this project gave me confidence to continue building applications with this technology stack.

---

## Assignment Requirements Covered

- Login Authentication
- CRUD Operations
- Angular Material
- Template-driven Forms
- Route Protection
- Auth Guard
- UUID Authentication
- HTTP Interceptor
- H2 Database
- Validation (Backend + Frontend)
- Global Exception Handling
- Layered Architecture
- Meaningful Git Commits

---

## Submission Checklist

- Public GitHub Repository
- Backend folder
- Frontend folder
- Maven Wrapper
- Runs using documented commands
- Seed data available
- Login credentials included
- README completed
- Incremental Git commits

---

Thank you for reviewing this project.

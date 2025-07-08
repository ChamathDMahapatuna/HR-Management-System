# HR Management System

A modern, full-stack Human Resource Management System built with Spring Boot (Backend) and React (Frontend). This system provides comprehensive employee, department, and role management capabilities with role-based access control.

> ⚠️ **Note:** Only the **frontend** of this project is currently deployed. The backend is still running locally.

🔗 **Live Frontend**: [https://hr-management-system-ten.vercel.app](https://hr-management-system-ten.vercel.app)

---

## 🚀 Features

### Core Features
- **Employee Management**: Add, view, edit, and delete employee records
- **Department Management**: Organize employees into departments
- **Role Management**: Define and manage job roles within the organization
- **User Authentication**: Secure login with JWT tokens
- **Role-Based Access Control**: Different permissions for different user roles

### User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access to all features (employees, departments, roles) |
| **HR** | Manage employees and departments, view roles |
| **MANAGER** | View employees, departments, and roles |
| **EMPLOYEE** | View employees, departments, and roles (read-only) |

### Technical Features
- **RESTful API**: Clean, well-structured REST endpoints
- **JWT Authentication**: Secure token-based authentication
- **Database**: H2 in-memory database with automatic data initialization
- **CORS Support**: Cross-origin resource sharing enabled
- **Responsive UI**: Modern, mobile-friendly interface

## 🛠️ Technology Stack

### Backend
- **Java 21**
- **Spring Boot 3.5.3**
- **Spring Security** with JWT
- **Spring Data JPA**
- **H2 Database**
- **Maven**

### Frontend
- **React 18**
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern styling
- **Vite** for build tooling

## 📋 Prerequisites

- **Java 21** or higher
- **Node.js 16** or higher
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository

PROJECT STRUCTURE

HRM/
├── hrm-frontend/          # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
├── src/                   # Backend Java code
│   └── main/java/com/example/hrm/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── model/
│       ├── repo/
│       └── service/
├── pom.xml
└── README.md

```bash



# HR Management System

A modern, full-stack Human Resource Management System built with Spring Boot (Backend) and React (Frontend). This system provides comprehensive employee, department, and role management capabilities with role-based access control.

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

Before running this application, make sure you have the following installed:

- **Java 21** or higher
- **Node.js 16** or higher
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HRM
```

### 2. Backend Setup

Navigate to the project root and start the Spring Boot application:

```bash
# Using Maven
mvn spring-boot:run

# Or using Maven wrapper
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd hrm-frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 👥 Default Users

The system comes with pre-configured test users:

| Username | Password | Role | Permissions |
|----------|----------|------|-------------|
| `admin` | `admin123` | ADMIN | Full access |
| `hr` | `hr123` | HR | Employee & Department management |
| `manager` | `manager123` | MANAGER | View access only |
| `employee` | `employee123` | EMPLOYEE | View access only |

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee (ADMIN, HR only)
- `PUT /api/employees/{id}` - Update employee (ADMIN, HR only)
- `DELETE /api/employees/{id}` - Delete employee (ADMIN, HR only)

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create new department (ADMIN, HR only)
- `PUT /api/departments/{id}` - Update department (ADMIN, HR only)
- `DELETE /api/departments/{id}` - Delete department (ADMIN, HR only)

### Roles
- `GET /api/roles` - Get all roles
- `GET /api/roles/{id}` - Get role by ID
- `POST /api/roles` - Create new role (ADMIN only)
- `PUT /api/roles/{id}` - Update role (ADMIN only)
- `DELETE /api/roles/{id}` - Delete role (ADMIN only)

## 🏗️ Project Structure

```
HRM/
├── src/
│   └── main/
│       └── java/com/example/hrm/
│           ├── config/          # Security and configuration
│           ├── controller/       # REST controllers
│           ├── dto/             # Data Transfer Objects
│           ├── model/           # Entity models
│           ├── repo/            # Repository interfaces
│           └── service/         # Business logic
├── hrm-frontend/
│   └── src/
│       ├── components/          # React components
│       ├── App.jsx             # Main app component
│       └── main.jsx            # Entry point
├── pom.xml                     # Maven configuration
└── README.md                   # This file
```

## 🔧 Configuration

### Backend Configuration
The application uses `application.properties` for configuration:
- Database: H2 in-memory database
- JWT: Configured with a secret key
- CORS: Enabled for frontend communication

### Frontend Configuration
- API Base URL: `http://localhost:8080`
- Development server: `http://localhost:5173`

## 🐛 Troubleshooting

### Common Issues

1. **Port 8080 already in use**
   ```bash
   # Find and kill the process using port 8080
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```

2. **Frontend can't connect to backend**
   - Ensure backend is running on `http://localhost:8080`
   - Check CORS configuration
   - Verify API endpoints are accessible

3. **Authentication issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify user credentials

### Logs
- Backend logs: Check console output during `mvn spring-boot:run`
- Frontend logs: Check browser developer tools console

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Method-level security with `@PreAuthorize`
- **Password Encryption**: BCrypt password hashing
- **CORS Protection**: Configured for secure cross-origin requests

## 🚀 Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run JAR file
java -jar target/HRM-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files
npm install -g serve
serve -s dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Create an issue in the repository

## 🎯 Future Enhancements

- [ ] Employee attendance tracking
- [ ] Leave management system
- [ ] Performance reviews
- [ ] Payroll integration
- [ ] Email notifications
- [ ] File upload for employee documents
- [ ] Advanced reporting and analytics
- [ ] Mobile application

---

**Happy Coding! 🎉** 
# HR Management System

A comprehensive HR Management System built with Spring Boot backend and React frontend, featuring CRUD operations for Employees, Departments, and Roles with JWT authentication.

## Features

- **Employee Management**: Full CRUD operations for employee records
- **Department Management**: Create, read, update, and delete departments
- **Role Management**: Manage job roles and designations
- **Authentication**: JWT-based authentication and authorization
- **Security**: Role-based access control (Admin, HR, Employee)
- **Database**: H2 in-memory database for development
- **Frontend**: Modern React application with Bootstrap UI

## Tech Stack

### Backend
- **Spring Boot 3.5.3**
- **Spring Security** with JWT authentication
- **Spring Data JPA** for data persistence
- **H2 Database** (in-memory)
- **Maven** for dependency management
- **Java 21**

### Frontend
- **React 19.1.0**
- **React Router DOM** for navigation
- **Bootstrap 5.3.3** for styling
- **Axios** for API calls
- **Formik & Yup** for form handling and validation
- **JWT Decode** for token management
- **Vite** for build tooling

## Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- Maven 3.6 or higher

## Setup Instructions

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HR-Management-System
   ```

2. **Navigate to the backend directory**
   ```bash
   cd src/main/java/com/mahapatuna/hr_management_system
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd FrondEnd/HR-Management-System-front_end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Roles
- `GET /api/roles` - Get all roles
- `GET /api/roles/{id}` - Get role by ID
- `POST /api/roles` - Create new role
- `PUT /api/roles/{id}` - Update role
- `DELETE /api/roles/{id}` - Delete role

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

## Security

The application implements role-based access control with the following roles:
- **ROLE_ADMIN**: Full access to all endpoints
- **ROLE_HR**: Access to employee, department, and role management
- **ROLE_EMPLOYEE**: Read-only access to employee data

## Project Structure

```
HR-Management-System/
├── src/main/java/com/mahapatuna/hr_management_system/
│   ├── controller/           # REST controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── entity/              # JPA entities
│   ├── repository/          # Data access layer
│   ├── service/             # Business logic
│   │   └── impl/           # Service implementations
│   └── security/           # Security configuration
│       ├── config/         # Security config
│       ├── controller/     # Auth controller
│       ├── dto/           # Auth DTOs
│       ├── entity/        # User entities
│       ├── jwt/           # JWT utilities
│       ├── repository/    # User repository
│       └── service/       # User details service
├── FrondEnd/HR-Management-System-front_end/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── auth/     # Authentication components
│   │   │   ├── common/   # Shared components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   └── layout/   # Layout components
│   │   └── services/     # API service layer
│   └── public/           # Static assets
└── pom.xml               # Maven configuration
```

## Usage

1. Start both backend and frontend applications
2. Register a new user account
3. Login with your credentials
4. Navigate through the dashboard to manage employees, departments, and roles

## Development

### Backend Development
- The application uses Spring Boot with auto-configuration
- JPA entities are automatically mapped to database tables
- JWT tokens are used for stateless authentication
- CORS is configured to allow frontend communication

### Frontend Development
- React components are organized by feature
- Bootstrap provides responsive UI components
- Formik handles form state and validation
- Axios interceptors handle JWT token management

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 8080 (backend) and 5173 (frontend) are available
2. **Database connection**: H2 console is accessible at `/h2-console`
3. **CORS issues**: CORS is configured to allow all origins for development
4. **JWT token**: Check browser console for token-related errors

### Logs
- Backend logs are available in the console where you run the Spring Boot application
- Frontend logs are available in the browser console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
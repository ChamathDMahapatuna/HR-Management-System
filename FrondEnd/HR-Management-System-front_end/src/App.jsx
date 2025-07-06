import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/common/ProtectedRoute';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Employee Components
import EmployeeList from './components/employees/EmployeeList';

// Department Components
import DepartmentList from './components/departments/DepartmentList';

// Role Components
import RoleList from './components/roles/RoleList';

// Import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          
          {/* Employee Routes - Admin and HR only */}
          <Route path="/employees/*" element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_HR']} />
          }>
            <Route path="" element={
              <Layout>
                <EmployeeList />
              </Layout>
            } />
            <Route path="add" element={
              <Layout>
                <div>
                  <h2>Add Employee</h2>
                  <p>Add employee form will go here</p>
                </div>
              </Layout>
            } />
          </Route>
          
          {/* Department Routes - Admin and HR only */}
          <Route path="/departments/*" element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_HR']} />
          }>
            <Route path="" element={
              <Layout>
                <DepartmentList />
              </Layout>
            } />
            <Route path="add" element={
              <Layout>
                <div>
                  <h2>Add Department</h2>
                  <p>Add department form will go here</p>
                </div>
              </Layout>
            } />
          </Route>
          
          {/* Role Routes - Admin and HR only */}
          <Route path="/roles/*" element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_HR']} />
          }>
            <Route path="" element={
              <Layout>
                <RoleList />
              </Layout>
            } />
            <Route path="add" element={
              <Layout>
                <div>
                  <h2>Add Role</h2>
                  <p>Add role form will go here</p>
                </div>
              </Layout>
            } />
          </Route>
          
          {/* User Profile */}
          <Route path="/profile" element={
            <Layout>
              <div>
                <h2>User Profile</h2>
                <p>Profile component will go here</p>
              </div>
            </Layout>
          } />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={
          <Layout>
            <Container>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </Container>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');
  const isHR = currentUser?.roles?.includes('ROLE_HR');
  const isEmployee = currentUser?.roles?.includes('ROLE_EMPLOYEE');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">HR Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                
                {/* Employee management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown title="Employees" id="employee-dropdown">
                    <NavDropdown.Item as={Link} to="/employees">View All</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/employees/add">Add Employee</NavDropdown.Item>
                  </NavDropdown>
                )}
                
                {/* Department management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown title="Departments" id="department-dropdown">
                    <NavDropdown.Item as={Link} to="/departments">View All</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/departments/add">Add Department</NavDropdown.Item>
                  </NavDropdown>
                )}
                
                {/* Roles management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown title="Roles" id="role-dropdown">
                    <NavDropdown.Item as={Link} to="/roles">View All</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/roles/add">Add Role</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {currentUser ? (
              <NavDropdown title={`Welcome, ${currentUser.username}`} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 
import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');
  const isHR = currentUser?.roles?.includes('ROLE_HR');
  const isEmployee = currentUser?.roles?.includes('ROLE_EMPLOYEE');

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary-custom">
          <i className="fas fa-users me-2"></i>
          HR Management System
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/dashboard" 
                  className={`fw-semibold ${isActive('/dashboard') ? 'text-primary-custom' : 'text-muted'}`}
                >
                  <i className="fas fa-tachometer-alt me-1"></i>
                  Dashboard
                </Nav.Link>
                
                {/* Employee management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown 
                    title={
                      <span className={`fw-semibold ${isActive('/employees') ? 'text-primary-custom' : 'text-muted'}`}>
                        <i className="fas fa-users me-1"></i>
                        Employees
                      </span>
                    } 
                    id="employee-dropdown"
                    className="fw-semibold"
                  >
                    <NavDropdown.Item as={Link} to="/employees" className="d-flex align-items-center">
                      <i className="fas fa-list me-2"></i>
                      View All Employees
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/employees/add" className="d-flex align-items-center">
                      <i className="fas fa-user-plus me-2"></i>
                      Add New Employee
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                
                {/* Department management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown 
                    title={
                      <span className={`fw-semibold ${isActive('/departments') ? 'text-primary-custom' : 'text-muted'}`}>
                        <i className="fas fa-building me-1"></i>
                        Departments
                      </span>
                    } 
                    id="department-dropdown"
                    className="fw-semibold"
                  >
                    <NavDropdown.Item as={Link} to="/departments" className="d-flex align-items-center">
                      <i className="fas fa-list me-2"></i>
                      View All Departments
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/departments/add" className="d-flex align-items-center">
                      <i className="fas fa-plus-circle me-2"></i>
                      Add New Department
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                
                {/* Roles management - Admin and HR only */}
                {(isAdmin || isHR) && (
                  <NavDropdown 
                    title={
                      <span className={`fw-semibold ${isActive('/roles') ? 'text-primary-custom' : 'text-muted'}`}>
                        <i className="fas fa-user-tag me-1"></i>
                        Roles
                      </span>
                    } 
                    id="role-dropdown"
                    className="fw-semibold"
                  >
                    <NavDropdown.Item as={Link} to="/roles" className="d-flex align-items-center">
                      <i className="fas fa-list me-2"></i>
                      View All Roles
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/roles/add" className="d-flex align-items-center">
                      <i className="fas fa-user-tag me-2"></i>
                      Add New Role
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
          
          <Nav className="ms-auto">
            {currentUser ? (
              <NavDropdown 
                title={
                  <div className="d-flex align-items-center">
                    <i className="fas fa-user-circle me-2" style={{ fontSize: '1.2rem', color: '#3498db' }}></i>
                    <span className="fw-semibold">{currentUser.username}</span>
                  </div>
                } 
                id="user-dropdown"
                className="fw-semibold"
              >
                <div className="px-3 py-2 border-bottom">
                  <small className="text-muted">Signed in as</small>
                  <div className="fw-semibold">{currentUser.username}</div>
                  <div className="mt-1">
                    {currentUser?.roles?.map((role, index) => (
                      <Badge 
                        key={index} 
                        bg={role === 'ROLE_ADMIN' ? 'danger' : role === 'ROLE_HR' ? 'warning' : 'info'}
                        className="me-1"
                        size="sm"
                      >
                        {role.replace('ROLE_', '')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <NavDropdown.Item as={Link} to="/profile" className="d-flex align-items-center">
                  <i className="fas fa-user me-2"></i>
                  My Profile
                </NavDropdown.Item>
                
                <NavDropdown.Divider />
                
                <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center text-danger">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-semibold">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="fw-semibold">
                  <i className="fas fa-user-plus me-1"></i>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 
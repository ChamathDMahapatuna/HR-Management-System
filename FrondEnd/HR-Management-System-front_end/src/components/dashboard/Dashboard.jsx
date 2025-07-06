import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import EmployeeService from '../../services/EmployeeService';
import DepartmentService from '../../services/DepartmentService';
import RoleService from '../../services/RoleService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    employeeCount: 0,
    departmentCount: 0,
    roleCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = AuthService.getCurrentUser();
  
  // Check user roles
  const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');
  const isHR = currentUser?.roles?.includes('ROLE_HR');
  const isEmployee = currentUser?.roles?.includes('ROLE_EMPLOYEE');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Only fetch data if the user has appropriate roles
        if (isAdmin || isHR || isEmployee) {
          const promises = [];
          
          // All users can see employee count
          promises.push(
            EmployeeService.getAllEmployees()
              .then(res => res.data.length)
              .catch(() => 0)
          );
          
          // Only admin and HR can see department and role counts
          if (isAdmin || isHR) {
            promises.push(
              DepartmentService.getAllDepartments()
                .then(res => res.data.length)
                .catch(() => 0)
            );
            
            promises.push(
              RoleService.getAllRoles()
                .then(res => res.data.length)
                .catch(() => 0)
            );
          } else {
            promises.push(Promise.resolve(0));
            promises.push(Promise.resolve(0));
          }
          
          const [employeeCount, departmentCount, roleCount] = await Promise.all(promises);
          
          setStats({
            employeeCount,
            departmentCount,
            roleCount
          });
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [isAdmin, isHR, isEmployee]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="border-0">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </Alert>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            <i className="fas fa-user-circle" style={{ fontSize: '3rem', color: '#3498db' }}></i>
          </div>
          <div>
            <h1 className="mb-1">Welcome back, {currentUser?.username}!</h1>
            <p className="text-muted mb-0">
              Here's what's happening in your HR Management System
            </p>
          </div>
        </div>
        
        {/* Role Badges */}
        <div className="mb-4">
          {currentUser?.roles?.map((role, index) => (
            <Badge 
              key={index} 
              bg={role === 'ROLE_ADMIN' ? 'danger' : role === 'ROLE_HR' ? 'warning' : 'info'}
              className="me-2 fs-6"
            >
              {role.replace('ROLE_', '')}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Statistics Cards */}
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <i className="fas fa-users" style={{ fontSize: '2rem', color: '#3498db' }}></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">{stats.employeeCount}</h3>
                  <p className="text-muted mb-0">Total Employees</p>
                </div>
              </div>
              <div className="mt-3">
                <Link to="/employees" className="btn btn-outline-primary btn-sm">
                  <i className="fas fa-eye me-2"></i>
                  View All Employees
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {(isAdmin || isHR) && (
          <>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <i className="fas fa-building" style={{ fontSize: '2rem', color: '#27ae60' }}></i>
                    </div>
                    <div>
                      <h3 className="mb-0 fw-bold">{stats.departmentCount}</h3>
                      <p className="text-muted mb-0">Total Departments</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link to="/departments" className="btn btn-outline-success btn-sm">
                      <i className="fas fa-eye me-2"></i>
                      View All Departments
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <i className="fas fa-user-tag" style={{ fontSize: '2rem', color: '#f39c12' }}></i>
                    </div>
                    <div>
                      <h3 className="mb-0 fw-bold">{stats.roleCount}</h3>
                      <p className="text-muted mb-0">Total Roles</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link to="/roles" className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-eye me-2"></i>
                      View All Roles
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
      
      {/* Quick Actions */}
      <Row>
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 pb-0">
              <h4 className="mb-0">
                <i className="fas fa-bolt me-2 text-primary-custom"></i>
                Quick Actions
              </h4>
            </Card.Header>
            <Card.Body className="pt-0">
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 py-3">
                      <Link to="/profile" className="text-decoration-none d-flex align-items-center">
                        <i className="fas fa-user-circle me-3 text-primary-custom"></i>
                        <span className="fw-semibold">View My Profile</span>
                        <i className="fas fa-chevron-right ms-auto text-muted"></i>
                      </Link>
                    </ListGroup.Item>
                    
                    {(isAdmin || isHR) && (
                      <>
                        <ListGroup.Item className="border-0 py-3">
                          <Link to="/employees/add" className="text-decoration-none d-flex align-items-center">
                            <i className="fas fa-user-plus me-3 text-success"></i>
                            <span className="fw-semibold">Add New Employee</span>
                            <i className="fas fa-chevron-right ms-auto text-muted"></i>
                          </Link>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="border-0 py-3">
                          <Link to="/departments/add" className="text-decoration-none d-flex align-items-center">
                            <i className="fas fa-plus-circle me-3 text-warning"></i>
                            <span className="fw-semibold">Add New Department</span>
                            <i className="fas fa-chevron-right ms-auto text-muted"></i>
                          </Link>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="border-0 py-3">
                          <Link to="/roles/add" className="text-decoration-none d-flex align-items-center">
                            <i className="fas fa-user-tag me-3 text-info"></i>
                            <span className="fw-semibold">Add New Role</span>
                            <i className="fas fa-chevron-right ms-auto text-muted"></i>
                          </Link>
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Col>
                
                <Col md={6}>
                  <div className="bg-light rounded-3 p-4 h-100">
                    <h6 className="fw-semibold mb-3">
                      <i className="fas fa-info-circle me-2 text-primary-custom"></i>
                      System Information
                    </h6>
                    <div className="mb-3">
                      <small className="text-muted">Current User:</small>
                      <p className="mb-0 fw-semibold">{currentUser?.username}</p>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">User Roles:</small>
                      <div>
                        {currentUser?.roles?.map((role, index) => (
                          <Badge 
                            key={index} 
                            bg={role === 'ROLE_ADMIN' ? 'danger' : role === 'ROLE_HR' ? 'warning' : 'info'}
                            className="me-1"
                          >
                            {role.replace('ROLE_', '')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">Last Login:</small>
                      <p className="mb-0 fw-semibold">Today</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 
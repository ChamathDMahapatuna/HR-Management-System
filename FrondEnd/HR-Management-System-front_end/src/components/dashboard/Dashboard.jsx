import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
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
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <h5 className="mb-3">Welcome, {currentUser?.username}!</h5>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="text-center">
              <h2>{stats.employeeCount}</h2>
              <p className="text-muted">Total Employees</p>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/employees">View All Employees</Link>
            </Card.Footer>
          </Card>
        </Col>
        
        {(isAdmin || isHR) && (
          <>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body className="text-center">
                  <h2>{stats.departmentCount}</h2>
                  <p className="text-muted">Total Departments</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Link to="/departments">View All Departments</Link>
                </Card.Footer>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body className="text-center">
                  <h2>{stats.roleCount}</h2>
                  <p className="text-muted">Total Roles</p>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Link to="/roles">View All Roles</Link>
                </Card.Footer>
              </Card>
            </Col>
          </>
        )}
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>Quick Links</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link to="/profile">View My Profile</Link>
              </ListGroup.Item>
              
              {(isAdmin || isHR) && (
                <>
                  <ListGroup.Item>
                    <Link to="/employees/add">Add New Employee</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/departments/add">Add New Department</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/roles/add">Add New Role</Link>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 
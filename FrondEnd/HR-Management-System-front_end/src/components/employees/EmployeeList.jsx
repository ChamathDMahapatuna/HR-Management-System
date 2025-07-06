import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Badge, 
  Spinner, 
  Alert, 
  Modal, 
  Form,
  Row,
  Col,
  InputGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await EmployeeService.getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    
    try {
      await EmployeeService.deleteEmployee(selectedEmployee.id);
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    } catch (err) {
      setError('Failed to delete employee');
      console.error(err);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="fas fa-users me-2 text-primary-custom"></i>
            Employees
          </h2>
          <p className="text-muted mb-0">Manage your organization's employees</p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i>
          Add Employee
        </Link>
      </div>

      {error && (
        <Alert variant="danger" className="border-0">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Badge bg="info" className="fs-6">
                {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Employees Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3">Employee</th>
                <th className="border-0 px-4 py-3">Department</th>
                <th className="border-0 px-4 py-3">Role</th>
                <th className="border-0 px-4 py-3">Status</th>
                <th className="border-0 px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-users" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                      <p className="mt-3">No employees found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-bottom">
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i className="fas fa-user-circle" style={{ fontSize: '2rem', color: '#3498db' }}></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{employee.name || 'N/A'}</div>
                          <small className="text-muted">{employee.email || 'No email'}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg="secondary" className="fs-6">
                        {employee.department || 'No Department'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg="info" className="fs-6">
                        {employee.role || 'No Role'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg={employee.active ? 'success' : 'danger'} className="fs-6">
                        {employee.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="btn-group" role="group">
                        <Link 
                          to={`/employees/${employee.id}`} 
                          className="btn btn-outline-primary btn-sm"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link 
                          to={`/employees/${employee.id}/edit`} 
                          className="btn btn-outline-warning btn-sm"
                          title="Edit Employee"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowDeleteModal(true);
                          }}
                          title="Delete Employee"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle text-danger me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete employee <strong>{selectedEmployee?.name}</strong>? 
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <i className="fas fa-trash me-2"></i>
            Delete Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList; 
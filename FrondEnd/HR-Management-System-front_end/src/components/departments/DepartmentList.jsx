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
import DepartmentService from '../../services/DepartmentService';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await DepartmentService.getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to load departments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDepartment) return;
    
    try {
      await DepartmentService.deleteDepartment(selectedDepartment.id);
      setDepartments(departments.filter(dept => dept.id !== selectedDepartment.id));
      setShowDeleteModal(false);
      setSelectedDepartment(null);
    } catch (err) {
      setError('Failed to delete department');
      console.error(err);
    }
  };

  const filteredDepartments = departments.filter(department =>
    department.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading departments...</p>
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
            <i className="fas fa-building me-2 text-success"></i>
            Departments
          </h2>
          <p className="text-muted mb-0">Manage your organization's departments</p>
        </div>
        <Link to="/departments/add" className="btn btn-success">
          <i className="fas fa-plus-circle me-2"></i>
          Add Department
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
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Badge bg="success" className="fs-6">
                {filteredDepartments.length} department{filteredDepartments.length !== 1 ? 's' : ''}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Departments Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3">Department</th>
                <th className="border-0 px-4 py-3">Description</th>
                <th className="border-0 px-4 py-3">Status</th>
                <th className="border-0 px-4 py-3">Employees</th>
                <th className="border-0 px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-building" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                      <p className="mt-3">No departments found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((department) => (
                  <tr key={department.id} className="border-bottom">
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i className="fas fa-building" style={{ fontSize: '2rem', color: '#27ae60' }}></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{department.name || 'N/A'}</div>
                          <small className="text-muted">ID: {department.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted">
                        {department.description || 'No description available'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg={department.active ? 'success' : 'danger'} className="fs-6">
                        {department.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg="info" className="fs-6">
                        {department.employeeCount || 0} employees
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="btn-group" role="group">
                        <Link 
                          to={`/departments/${department.id}`} 
                          className="btn btn-outline-primary btn-sm"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link 
                          to={`/departments/${department.id}/edit`} 
                          className="btn btn-outline-warning btn-sm"
                          title="Edit Department"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => {
                            setSelectedDepartment(department);
                            setShowDeleteModal(true);
                          }}
                          title="Delete Department"
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
          Are you sure you want to delete department <strong>{selectedDepartment?.name}</strong>? 
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <i className="fas fa-trash me-2"></i>
            Delete Department
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentList; 
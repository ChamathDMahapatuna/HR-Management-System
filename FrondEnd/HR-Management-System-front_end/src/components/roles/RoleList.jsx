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
import RoleService from '../../services/RoleService';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await RoleService.getAllRoles();
      setRoles(response.data);
    } catch (err) {
      setError('Failed to load roles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRole) return;
    
    try {
      await RoleService.deleteRole(selectedRole.id);
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setShowDeleteModal(false);
      setSelectedRole(null);
    } catch (err) {
      setError('Failed to delete role');
      console.error(err);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'hr':
        return 'warning';
      case 'employee':
        return 'info';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading roles...</p>
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
            <i className="fas fa-user-tag me-2 text-warning"></i>
            Roles
          </h2>
          <p className="text-muted mb-0">Manage your organization's roles and permissions</p>
        </div>
        <Link to="/roles/add" className="btn btn-warning">
          <i className="fas fa-user-tag me-2"></i>
          Add Role
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
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Badge bg="warning" className="fs-6">
                {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Roles Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3">Role</th>
                <th className="border-0 px-4 py-3">Description</th>
                <th className="border-0 px-4 py-3">Permissions</th>
                <th className="border-0 px-4 py-3">Status</th>
                <th className="border-0 px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-user-tag" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                      <p className="mt-3">No roles found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role) => (
                  <tr key={role.id} className="border-bottom">
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i className="fas fa-user-tag" style={{ fontSize: '2rem', color: '#f39c12' }}></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{role.name || 'N/A'}</div>
                          <small className="text-muted">ID: {role.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted">
                        {role.description || 'No description available'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        {role.permissions?.map((permission, index) => (
                          <Badge 
                            key={index} 
                            bg="light" 
                            text="dark" 
                            className="me-1 mb-1"
                          >
                            {permission}
                          </Badge>
                        )) || (
                          <span className="text-muted">No permissions</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge bg={role.active ? 'success' : 'danger'} className="fs-6">
                        {role.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="btn-group" role="group">
                        <Link 
                          to={`/roles/${role.id}`} 
                          className="btn btn-outline-primary btn-sm"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link 
                          to={`/roles/${role.id}/edit`} 
                          className="btn btn-outline-warning btn-sm"
                          title="Edit Role"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => {
                            setSelectedRole(role);
                            setShowDeleteModal(true);
                          }}
                          title="Delete Role"
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
          Are you sure you want to delete role <strong>{selectedRole?.name}</strong>? 
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <i className="fas fa-trash me-2"></i>
            Delete Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleList; 
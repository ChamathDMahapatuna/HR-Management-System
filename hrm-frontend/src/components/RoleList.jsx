import { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleList.css';

const RoleList = ({ token, userRole }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoles(response.data);
    } catch (err) {
      setError('Failed to fetch roles');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: ''
    });
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/roles', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddForm(false);
      resetForm();
      fetchRoles();
    } catch (err) {
      setError('Failed to add role');
      console.error('Error adding role:', err);
    }
  };

  const handleEditRole = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/roles/${selectedRole.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEditForm(false);
      setSelectedRole(null);
      resetForm();
      fetchRoles();
    } catch (err) {
      setError('Failed to update role');
      console.error('Error updating role:', err);
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await axios.delete(`http://localhost:8080/api/roles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchRoles();
      } catch (err) {
        setError('Failed to delete role');
        console.error('Error deleting role:', err);
      }
    }
  };

  const openEditForm = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || ''
    });
    setShowEditForm(true);
  };

  if (loading) {
    return <div className="loading">Loading roles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="role-list">
      <div className="page-header">
        <h1>Roles</h1>
        <div className="header-actions">
          <p>Total: {roles.length} roles</p>
          {userRole === 'ROLE_ADMIN' && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              Add Role
            </button>
          )}
        </div>
      </div>

      {/* Add Role Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Role</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddRole} className="form">
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter role description..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Add Role</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Form */}
      {showEditForm && selectedRole && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Role</h2>
              <button className="close-btn" onClick={() => setShowEditForm(false)}>×</button>
            </div>
            <form onSubmit={handleEditRole} className="form">
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter role description..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update Role</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="roles-container">
        {roles.map((role) => (
          <div key={role.id} className="role-item">
            <div className="role-info">
              <h3>{role.name}</h3>
              <p>{role.description || 'No description available'}</p>
            </div>
            <div className="role-footer">
              <div className="role-id">#{role.id}</div>
              {userRole === 'ROLE_ADMIN' && (
                <div className="role-actions">
                  <button 
                    className="btn btn-small btn-secondary"
                    onClick={() => openEditForm(role)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-small btn-danger"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {roles.length === 0 && (
        <div className="no-data">
          <p>No roles found.</p>
        </div>
      )}
    </div>
  );
};

export default RoleList; 
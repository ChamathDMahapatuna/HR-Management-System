import { useState, useEffect } from 'react';
import apiClient from '../services/api.service';
import { API_ENDPOINTS } from '../config/api';
import './DepartmentList.css';

const DepartmentList = ({ userRole }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DEPARTMENTS);
      setDepartments(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch departments');
      console.error('Error fetching departments:', err);
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

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.DEPARTMENTS, formData);
      setShowAddForm(false);
      resetForm();
      fetchDepartments();
    } catch (err) {
      setError(err.message || 'Failed to add department');
      console.error('Error adding department:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.put(`${API_ENDPOINTS.DEPARTMENTS}/${selectedDepartment.id}`, formData);
      setShowEditForm(false);
      setSelectedDepartment(null);
      resetForm();
      fetchDepartments();
    } catch (err) {
      setError(err.message || 'Failed to update department');
      console.error('Error updating department:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await apiClient.delete(`${API_ENDPOINTS.DEPARTMENTS}/${id}`);
        fetchDepartments();
      } catch (err) {
        setError(err.message || 'Failed to delete department');
        console.error('Error deleting department:', err);
      }
    }
  };

  const openEditForm = (department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      description: department.description || ''
    });
    setShowEditForm(true);
  };

  if (loading) {
    return <div className="loading">Loading departments...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="department-list">
      <div className="page-header">
        <h1>Departments</h1>
    
        <div className="header-actions">
          <p>Total: {departments.length} departments</p>
          {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_HR') && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              Add Department
            </button>
          )}
        </div>
      </div>

      {/* Add Department Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Department</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddDepartment} className="form">
              <div className="form-group">
                <label>Department Name</label>
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
                  placeholder="Enter department description..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Add Department</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Form */}
      {showEditForm && selectedDepartment && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Department</h2>
              <button className="close-btn" onClick={() => setShowEditForm(false)}>×</button>
            </div>
            <form onSubmit={handleEditDepartment} className="form">
              <div className="form-group">
                <label>Department Name</label>
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
                  placeholder="Enter department description..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update Department</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="departments-grid">
        {departments.map((department) => (
          <div key={department.id} className="department-card">
            <div className="department-header">
              <h3>{department.name}</h3>
              <span className="department-id">#{department.id}</span>
            </div>
            <p className="department-description">
              {department.description || 'No description available'}
            </p>
            {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_HR') && (
              
              <div className="department-actions">
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => openEditForm(department)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="no-data">
          <p>No departments found.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentList; 
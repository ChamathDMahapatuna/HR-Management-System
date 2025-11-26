import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api.service';
import { API_ENDPOINTS } from '../config/api';
import './Dashboard.css';
import { Link } from 'react-router-dom';


const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalRoles: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const [employeesRes, departmentsRes, rolesRes] = await Promise.all([
        apiClient.get(API_ENDPOINTS.EMPLOYEES),
        apiClient.get(API_ENDPOINTS.DEPARTMENTS),
        apiClient.get(API_ENDPOINTS.ROLES)
      ]);

      setStats({
        totalEmployees: employeesRes.data.length,
        totalDepartments: departmentsRes.data.length,
        totalRoles: rolesRes.data.length
      });
      setError('');
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to HR Management System</h1>
        <p className="user-info">
          Hello, <strong>{user?.username}</strong>! 
          You are logged in as <strong>{user?.role?.replace('ROLE_', '')}</strong>
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <p className="stat-number">{stats.totalEmployees}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>Departments</h3>
            <p className="stat-number">{stats.totalDepartments}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3>Roles</h3>
            <p className="stat-number">{stats.totalRoles}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <h3>View Employees</h3>
            <p>Browse and manage employee information</p>
            <Link to="/employees" className="action-link">Go to Employees</Link>
          </div>
          
          <div className="action-card">
            <h3>View Departments</h3>
            <p>Browse department information</p>
            <Link to="/departments" className="action-link">Go to Departments</Link>
          </div>
          
          {user?.role === 'ROLE_ADMIN' && (
            <div className="action-card">
              <h3>Manage Roles</h3>
              <p>Create and manage system roles</p>
              <Link to="/roles" className="action-link">Go to Roles</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
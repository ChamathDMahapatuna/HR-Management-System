import { useState } from 'react';
import apiClient from '../services/api.service';
import { API_ENDPOINTS } from '../config/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Login and get token
      const loginResponse = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { token } = loginResponse.data;

      if (!token) {
        throw new Error('No token received from server');
      }

      // Step 2: Store token temporarily
      localStorage.setItem('token', token);

      // Step 3: Fetch user info using the token
      const userResponse = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      const { username, role } = userResponse.data;

      // Step 4: Call onLogin with user data and token
      onLogin({ username, role }, token);
    } catch (err) {
      localStorage.removeItem('token');
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>HR Management System</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {import.meta.env.VITE_ENV === 'development' && (
          <div className="test-credentials">
            <h3>Test Credentials:</h3>
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>HR:</strong> hr / hr123</p>
            <p><strong>Manager:</strong> manager / manager123</p>
            <p><strong>Employee:</strong> employee / employee123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login; 
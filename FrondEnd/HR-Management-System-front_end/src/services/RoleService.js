import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/roles/';

// Add JWT token to all requests
axios.interceptors.request.use(
  config => {
    const token = AuthService.getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

class RoleService {
  getAllRoles() {
    return axios.get(API_URL);
  }

  getRoleById(id) {
    return axios.get(API_URL + id);
  }

  createRole(role) {
    return axios.post(API_URL, role);
  }

  updateRole(id, role) {
    return axios.put(API_URL + id, role);
  }

  deleteRole(id) {
    return axios.delete(API_URL + id);
  }
}

export default new RoleService(); 
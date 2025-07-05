import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/departments/';

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

class DepartmentService {
  getAllDepartments() {
    return axios.get(API_URL);
  }

  getDepartmentById(id) {
    return axios.get(API_URL + id);
  }

  createDepartment(department) {
    return axios.post(API_URL, department);
  }

  updateDepartment(id, department) {
    return axios.put(API_URL + id, department);
  }

  deleteDepartment(id) {
    return axios.delete(API_URL + id);
  }
}

export default new DepartmentService(); 
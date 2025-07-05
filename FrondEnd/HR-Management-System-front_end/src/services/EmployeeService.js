import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/employees/';

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

class EmployeeService {
  getAllEmployees() {
    return axios.get(API_URL);
  }

  getEmployeeById(id) {
    return axios.get(API_URL + id);
  }

  getEmployeesByDepartment(departmentId) {
    return axios.get(API_URL + 'department/' + departmentId);
  }

  getEmployeesByRole(roleId) {
    return axios.get(API_URL + 'role/' + roleId);
  }

  createEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  updateEmployee(id, employee) {
    return axios.put(API_URL + id, employee);
  }

  deleteEmployee(id) {
    return axios.delete(API_URL + id);
  }
}

export default new EmployeeService(); 
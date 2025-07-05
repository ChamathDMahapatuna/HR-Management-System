import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password, roles) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!user;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user || !user.roles) return false;
    return user.roles.includes(requiredRole);
  }
}

export default new AuthService(); 
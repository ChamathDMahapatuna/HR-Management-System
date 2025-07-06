import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">HR Management System</Link>
      </div>
      
      <div className="navbar-menu">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/employees" className="nav-link">Employees</Link>
        <Link to="/departments" className="nav-link">Departments</Link>
        {user?.role === 'ROLE_ADMIN' && (
          <Link to="/roles" className="nav-link">Roles</Link>
        )}
      </div>
      
      <div className="navbar-user">
        <span className="user-info">
          Welcome, {user?.username} ({user?.role?.replace('ROLE_', '')})
        </span>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 
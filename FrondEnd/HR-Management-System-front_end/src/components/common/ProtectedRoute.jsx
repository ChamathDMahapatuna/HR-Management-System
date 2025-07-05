import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProtectedRoute = ({ requiredRoles, redirectPath = '/login' }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const user = AuthService.getCurrentUser();
  
  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If no specific roles required, just check if logged in
  if (!requiredRoles || requiredRoles.length === 0) {
    return <Outlet />;
  }
  
  // Check if user has at least one of the required roles
  const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
  
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute; 
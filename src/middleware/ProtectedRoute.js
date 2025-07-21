import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

/**
 * ProtectedRoute component to protect routes based on authentication and user roles
 * @param {Object} props - Component props
 * @param {Array} props.allowedRoles - Array of roles allowed to access the route
 * @param {boolean} props.requireAuth - Whether authentication is required
 */
const ProtectedRoute = ({ allowedRoles = [], requireAuth = true }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if token exists
        const token = localStorage.getItem('token') || Cookies.get('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Parse user data
        const user = JSON.parse(userData);
        setUserRole(user.role);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    // You could return a loading spinner here
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but doesn't have the required role
  if (isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    toast.error('You do not have permission to access this page');
    
    // Redirect based on role
    if (userRole === 'ADMIN') {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (userRole === 'EDITOR') {
      return <Navigate to="/editor/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If everything is fine, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

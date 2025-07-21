import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

/**
 * Handles user logout process
 * - Calls the logout API
 * - Clears local storage
 * - Shows success notification
 * - Redirects to login page
 * 
 * @returns {Promise<void>}
 */
export const handleLogout = async () => {
  try {
    logout();
    toast.success('Logged out successfully');
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
    toast.error('Logout failed, but session was cleared');
    // Still redirect to login page even if API call fails
    window.location.href = '/login';
  }
};

/**
 * Check if the user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token') || Cookies.get('token');
  return !!token;
};

/**
 * Get the current user data
 * @returns {Object|null} User data or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Check if the user has the required role
 * @param {string|Array} requiredRoles - Role or array of roles required
 * @returns {boolean} Whether the user has the required role
 */
export const hasRole = (requiredRoles) => {
  const user = getCurrentUser();
  
  if (!user || !user.role) {
    return false;
  }
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(user.role);
  }
  
  return user.role === requiredRoles;
};

/**
 * Logout the user by removing all authentication data
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  Cookies.remove('token');
};

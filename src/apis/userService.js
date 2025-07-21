import { useState } from 'react';
import { getCookie } from "./authService";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useUserServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to make API calls
  const apiCall = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get token from cookie
      const token = getCookie('token');
      
      // Prepare headers with token if available
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers,
        credentials: 'include', // Include cookies in requests
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create User
  const createUser = async (userData) => {
    return await apiCall('/api/v1/user/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  };

  // Get Users with filtering and pagination
  const getUsers = async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = `/api/v1/user/${queryString ? `?${queryString}` : ''}`;
    
    return await apiCall(url);
  };

  // Get Single User
  const getUser = async (id) => {
    return await apiCall(`/api/v1/user/${id}`);
  };

  // Update User
  const updateUser = async (id, userData) => {
    return await apiCall(`/api/v1/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  };

  // Update User Password
  const updateUserPassword = async (id, passwordData) => {
    return await apiCall(`/api/v1/user/${id}/password`, {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
    });
  };

  // Toggle User Status
  const toggleUserStatus = async (id) => {
    return await apiCall(`/api/v1/user/${id}/toggle-status`, {
      method: 'PATCH',
    });
  };

  // Delete User
  const deleteUser = async (id) => {
    return await apiCall(`/api/v1/user/${id}`, {
      method: 'DELETE',
    });
  };

  // Delete Multiple Users
  const deleteUsers = async (userIds) => {
    const deletePromises = userIds.map(id => deleteUser(id));
    return await Promise.allSettled(deletePromises);
  };

  return {
    loading,
    error,
    createUser,
    getUsers,
    getUser,
    updateUser,
    updateUserPassword,
    toggleUserStatus,
    deleteUser,
    deleteUsers,
  };
};
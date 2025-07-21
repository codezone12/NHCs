import { useState } from 'react';
import axios from 'axios';
import { getCookie } from "./authService";

// Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    // Get token from cookie
    const token = getCookie('token');
    
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      withCredentials: true, // Include cookies for authentication
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export const useTransportationServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new transportation option
  const createTransportation = async (transportData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/transportations', 'POST', transportData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating transportation option');
      setLoading(false);
      throw err;
    }
  };

  // Get all transportation options with filtering and pagination
  const getTransportations = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key]);
        }
      });

      const queryString = queryParams.toString();
      const url = `/api/v1/transportations${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching transportation options');
      setLoading(false);
      throw err;
    }
  };

  // Get public transportation options (active only)
  const getPublicTransportations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/transportations/public');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching public transportation options');
      setLoading(false);
      throw err;
    }
  };

  // Get transportation option by ID
  const getTransportationById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/transportations/${id}`);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching transportation option');
      setLoading(false);
      throw err;
    }
  };

  // Update transportation option
  const updateTransportation = async (id, transportData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/transportations/${id}`, 'PUT', transportData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating transportation option');
      setLoading(false);
      throw err;
    }
  };

  // Delete transportation option
  const deleteTransportation = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/transportations/${id}`, 'DELETE');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting transportation option');
      setLoading(false);
      throw err;
    }
  };

  // Toggle transportation option status
  const toggleTransportationStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/transportations/${id}/toggle-status`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling transportation status');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    createTransportation,
    getTransportations,
    getPublicTransportations,
    getTransportationById,
    updateTransportation,
    deleteTransportation,
    toggleTransportationStatus
  };
};

export default useTransportationServices;

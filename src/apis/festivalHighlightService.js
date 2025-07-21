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

export const useFestivalHighlightServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new festival highlight
  const createFestivalHighlight = async (highlightData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/festival-highlights', 'POST', highlightData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating festival highlight');
      setLoading(false);
      throw err;
    }
  };

  // Get all festival highlights with filtering and pagination
  const getFestivalHighlights = async (params = {}) => {
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
      const url = `/api/v1/festival-highlights${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching festival highlights');
      setLoading(false);
      throw err;
    }
  };

  // Get public festival highlights (active only)
  const getPublicFestivalHighlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/festival-highlights/public');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching public festival highlights');
      setLoading(false);
      throw err;
    }
  };

  // Get festival highlight by ID
  const getFestivalHighlightById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/festival-highlights/${id}`);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching festival highlight');
      setLoading(false);
      throw err;
    }
  };

  // Update festival highlight
  const updateFestivalHighlight = async (id, highlightData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/festival-highlights/${id}`, 'PUT', highlightData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating festival highlight');
      setLoading(false);
      throw err;
    }
  };

  // Toggle festival highlight status
  const toggleFestivalHighlightStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/festival-highlights/${id}/toggle-status`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling festival highlight status');
      setLoading(false);
      throw err;
    }
  };

  // Delete festival highlight
  const deleteFestivalHighlight = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/festival-highlights/${id}`, 'DELETE');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting festival highlight');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    createFestivalHighlight,
    getFestivalHighlights,
    getPublicFestivalHighlights,
    getFestivalHighlightById,
    updateFestivalHighlight,
    toggleFestivalHighlightStatus,
    deleteFestivalHighlight
  };
};

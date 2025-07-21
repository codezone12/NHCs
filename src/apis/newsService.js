import { useState } from 'react';
import axios from 'axios';
import { getCookie } from "./authService";

// Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null, config = {}) => {
  try {
    // Get token from cookie
    const token = getCookie('token');
    
    // Prepare headers with token if available
    const headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const defaultConfig = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
      withCredentials: true, // Include cookies for authentication
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      if (data instanceof FormData) {
        // Remove content-type for FormData to let the browser set it with the correct boundary
        delete headers['Content-Type'];
        defaultConfig.data = data;
      } else {
        defaultConfig.data = data;
      }
    }

    const response = await axios({
      ...defaultConfig,
      ...config,
    });
    
    return response.data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export const useNewsServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new news article with optional image upload
  const createNews = async (newsData, imageFile = null) => {
    setLoading(true);
    setError(null);
    try {
      // If there's an image file, use FormData to send multipart/form-data
      let data;
      let config = {};
      
      if (imageFile) {
        data = new FormData();
        // Add news data to FormData
        Object.keys(newsData).forEach(key => {
          data.append(key, newsData[key]);
        });
        // Add image file
        data.append('imageFile', imageFile);
      } else {
        data = newsData;
      }

      const response = await apiCall('/api/v1/news', 'POST', data, config);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating news article');
      setLoading(false);
      throw err;
    }
  };

  // Get all news with filtering and pagination
  const getNews = async (params = {}) => {
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
      const url = `/api/v1/news${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching news articles');
      setLoading(false);
      throw err;
    }
  };

  // Get public news (active only)
  const getPublicNews = async (params = {}) => {
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
      const url = `/api/v1/news/public${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching public news articles');
      setLoading(false);
      throw err;
    }
  };

  // Get trending news
  const getTrendingNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/news/trending');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching trending news articles');
      setLoading(false);
      throw err;
    }
  };

  // Get news by ID
  const getNewsById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/news/${id}`);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching news article');
      setLoading(false);
      throw err;
    }
  };

  // Update news with optional image upload
  const updateNews = async (id, newsData, imageFile = null) => {
    setLoading(true);
    setError(null);
    try {
      // If there's an image file, use FormData to send multipart/form-data
      let data;
      let config = {};
      
      if (imageFile) {
        data = new FormData();
        // Add news data to FormData
        Object.keys(newsData).forEach(key => {
          data.append(key, newsData[key]);
        });
        // Add image file
        data.append('imageFile', imageFile);
      } else {
        data = newsData;
      }

      const response = await apiCall(`/api/v1/news/${id}`, 'PUT', data, config);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating news article');
      setLoading(false);
      throw err;
    }
  };

  // Delete news
  const deleteNews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/news/${id}`, 'DELETE');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting news article');
      setLoading(false);
      throw err;
    }
  };

  // Toggle news status
  const toggleNewsStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/news/${id}/toggle-status`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling news status');
      setLoading(false);
      throw err;
    }
  };

  // Toggle trending status
  const toggleTrendingStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/news/${id}/toggle-trending`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling trending status');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    createNews,
    getNews,
    getPublicNews,
    getTrendingNews,
    getNewsById,
    updateNews,
    deleteNews,
    toggleNewsStatus,
    toggleTrendingStatus
  };
};

export default useNewsServices;

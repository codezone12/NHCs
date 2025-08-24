import { useState } from 'react';
import axios from 'axios';
import { getCookie } from './authService';

// Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null, config = {}) => {
  try {
    // Get token from cookie
    const token = getCookie('token');
    
    const defaultConfig = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies for authentication
    };
    
    // Add token to Authorization header if available
    if (token) {
      defaultConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge configs
    const mergedConfig = { ...defaultConfig, ...config };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      if (data instanceof FormData) {
        mergedConfig.headers['Content-Type'] = 'multipart/form-data';
        mergedConfig.data = data;
      } else {
        mergedConfig.data = data;
      }
    }

    const response = await axios(mergedConfig);
    return response.data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export const useBlogServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new blog post with optional PDF and image upload
  const createBlog = async (blogData, pdfFile = null, imageFile = null) => {
    setLoading(true);
    setError(null);
    try {
      // If there are files, use FormData to send multipart/form-data
      let data;
      let config = {};
      
      if (pdfFile || imageFile) {
        data = new FormData();
        // Add blog data to FormData
        Object.keys(blogData).forEach(key => {
          data.append(key, blogData[key]);
        });
        // Add PDF file if provided
        if (pdfFile) {
          data.append('pdfFile', pdfFile);
        }
        // Add image file if provided
        if (imageFile) {
          data.append('imageFile', imageFile);
        }
      } else {
        data = blogData;
      }

      const response = await apiCall('/api/v1/blogs', 'POST', data, config);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating blog post');
      setLoading(false);
      throw err;
    }
  };

  // Get all blogs with filtering and pagination
  const getBlogs = async (params = {}) => {
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
      const url = `/api/v1/blogs${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching blog posts');
      setLoading(false);
      throw err;
    }
  };

  // Get public blogs (active only)
  const getPublicBlogs = async (params = {}) => {
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
      const url = `/api/v1/blogs/public${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(url);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching public blog posts');
      setLoading(false);
      throw err;
    }
  };

  // Get featured blogs
  const getFeaturedBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/v1/blogs/featured');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching featured blog posts');
      setLoading(false);
      throw err;
    }
  };

  // Get blog by ID
  const getBlogById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/blogs/${id}`);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching blog post');
      setLoading(false);
      throw err;
    }
  };

  // Update blog with optional PDF and image upload
  const updateBlog = async (id, blogData, pdfFile = null, imageFile = null) => {
    setLoading(true);
    setError(null);
    try {
      // If there are files, use FormData to send multipart/form-data
      let data;
      let config = {};
      
      if (pdfFile || imageFile) {
        data = new FormData();
        // Add blog data to FormData
        Object.keys(blogData).forEach(key => {
          data.append(key, blogData[key]);
        });
        // Add PDF file if provided
        if (pdfFile) {
          data.append('pdfFile', pdfFile);
        }
        // Add image file if provided
        if (imageFile) {
          data.append('imageFile', imageFile);
        }
      } else {
        data = blogData;
      }

      const response = await apiCall(`/api/v1/blogs/${id}`, 'PUT', data, config);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating blog post');
      setLoading(false);
      throw err;
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/blogs/${id}`, 'DELETE');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting blog post');
      setLoading(false);
      throw err;
    }
  };

  // Toggle blog status
  const toggleBlogStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/blogs/${id}/toggle-status`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling blog status');
      setLoading(false);
      throw err;
    }
  };

  // Toggle featured status
  const toggleFeaturedStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/api/v1/blogs/${id}/toggle-featured`, 'PATCH');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling featured status');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    createBlog,
    getBlogs,
    getPublicBlogs,
    getFeaturedBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    toggleFeaturedStatus
  };
};

export default useBlogServices;

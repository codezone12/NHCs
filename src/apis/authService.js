import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/v1/users';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add authentication token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to handle common errors
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token on authentication errors
      localStorage.removeItem('token');
    }
    return Promise.reject(
      error.response?.data?.message || error.message || 'An error occurred'
    );
  }
);

// Register a new user
export const signup = async (userData) => {
  try {
    console.log('Sending signup data:', userData);
    return await api.post('/signup', userData);
  } catch (error) {
    console.error('Signup error:', error.response || error);
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const data = await api.post('/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.get('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove token even if API call fails
    localStorage.removeItem('token');
  }
};

// Request password reset
export const forgotPassword = async (email) => {
  return api.post('/forgot-password', { email });
};

// Verify OTP for password reset
export const verifyOtp = async (email, otp) => {
  return api.post('/verify-otp', { email, otp });
};

// Reset password with token
export const resetPassword = async (token, password) => {
  return api.post(`/reset-password/${token}`, { password });
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // This endpoint would need to be implemented in your backend
    const data = await api.get('/me');
    return data.data?.user;
  } catch (error) {
    console.error('Get user error:', error);
    localStorage.removeItem('token');
    return null;
  }
};

// Submit contact form
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    toast.success('Message sent successfully!');
    return response;
  } catch (error) {
    console.error('Contact form submission error:', error);
    toast.error('Failed to send message!');
    throw error;
  }
};
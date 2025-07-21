import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'https://nh-cs-be.vercel.app/api/v1';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies in requests
});

// Request interceptor for any additional configuration
api.interceptors.request.use(config => {
  // Get token from cookie and add to Authorization header
  const token = getCookie('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
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
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
    return await api.post('/api/v1/signup', userData);
  } catch (error) {
    console.error('Signup error:', error.response || error);
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const data = await api.post('/api/v1/login', { email, password });
    if (data.token) {
      document.cookie = `token=${data.token}; path=/;`;
      // Also store user data for easy access
      if (data.data && data.data.user) {
        document.cookie = `user=${JSON.stringify(data.data.user)}; path=/;`;
      }
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    // Extract the error message from the response in a more robust way
    const errorMessage =
      error || // Fallback to error object message
      'Failed to login. Please try again.'; // Default message
    
    throw new Error(errorMessage);
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.get('/api/v1/logout');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove token even if API call fails
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

// Request password reset
export const forgotPassword = async (email) => {
  return api.post('/api/v1/forgot-password', { email });
};

// Verify OTP for password reset
export const verifyOtp = async (email, otp) => {
  return api.post('/api/v1/verify-otp', { email, otp });
};

// Reset password with token
export const resetPassword = async (token, password) => {
  return api.post(`/api/v1/reset-password/${token}`, { password });
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const token = getCookie('token');
    if (!token) return null;
    
    // This endpoint would need to be implemented in your backend
    const data = await api.get('/me');
    return data.data?.user;
  } catch (error) {
    console.error('Get user error:', error);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return null;
  }
};

// Submit contact form
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/api/v1/contact', contactData);
    toast.success('Message sent successfully!');
    return response;
  } catch (error) {
    console.error('Contact form submission error:', error);
    toast.error('Failed to send message!');
    throw error;
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await api.post('/api/v1/newsletter/subscribe', { email });
    toast.success('Successfully subscribed to newsletter!');
    return response;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    toast.error(error);
    throw error;
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (email) => {
  try {
    const response = await api.post('/api/v1/newsletter/unsubscribe', { email });
    toast.success('Successfully unsubscribed from newsletter.');
    return response;
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    toast.error(error.message || 'Failed to unsubscribe from newsletter!');
    throw error;
  }
};

// Helper function to get cookie value
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
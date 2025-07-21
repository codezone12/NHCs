import { useState } from 'react';
import { getCookie } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useEventServices = () => {
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

  // Create Event
  const createEvent = async (eventData) => {
    return await apiCall('/api/v1/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  };

  // Get Events with filtering and pagination
  const getEvents = async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = `/api/v1/events${queryString ? `?${queryString}` : ''}`;
    
    return await apiCall(url);
  };

  // Get Single Event
  const getEvent = async (id) => {
    return await apiCall(`/api/v1/events/${id}`);
  };

  // Update Event
  const updateEvent = async (id, eventData) => {
    return await apiCall(`/api/v1/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  };

  // Toggle Event Status
  const toggleEventStatus = async (id) => {
    return await apiCall(`/api/v1/events/${id}/toggle-status`, {
      method: 'PATCH',
    });
  };

  // Delete Event
  const deleteEvent = async (id) => {
    return await apiCall(`/api/v1/events/${id}`, {
      method: 'DELETE',
    });
  };

  // Get Upcoming Events (for public display)
  const getUpcomingEvents = async (limit = 5) => {
    return await apiCall(`/api/v1/events?upcoming=true&active=true&limit=${limit}`);
  };

  return {
    loading,
    error,
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    toggleEventStatus,
    deleteEvent,
    getUpcomingEvents,
  };
};

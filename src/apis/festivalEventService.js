import { useState } from 'react';
import axios from 'axios';
import { getCookie } from "./authService";

// Base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || '';

/**
 * Festival Event Service - Handles all API calls related to festival events
 */
export const useFestivalEventServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Helper function to make API calls with loading and error handling
   * @param {Function} apiCall - The API call function to execute
   * @returns {Promise} - The result of the API call
   */
  const apiCallHelper = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get auth token
  const getAuthHeaders = () => {
    const token = getCookie('token');
    return {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      withCredentials: true
    };
  };

  /**
   * Create a new festival event
   * @param {Object} eventData - The festival event data
   * @returns {Promise} - The created festival event
   */
  const createFestivalEvent = (eventData) => {
    return apiCallHelper(() => axios.post(`${API_URL}/api/v1/festival-events`, eventData, getAuthHeaders()));
  };

  /**
   * Get all festival events with filtering and pagination
   * @param {Object} params - Query parameters for filtering and pagination
   * @returns {Promise} - The festival events and pagination data
   */
  const getFestivalEvents = (params = {}) => {
    return apiCallHelper(() => axios.get(`${API_URL}/api/v1/festival-events`, { 
      params, 
      ...getAuthHeaders() 
    }));
  };

  /**
   * Get public festival events (active and upcoming only)
   * @param {number} limit - Number of events to retrieve
   * @returns {Promise} - The public festival events
   */
  const getPublicFestivalEvents = (limit = 3) => {
    return apiCallHelper(() => axios.get(`${API_URL}/api/v1/festival-events/public`, { 
      params: { limit }, 
      ...getAuthHeaders() 
    }));
  };

  /**
   * Get festival event by ID
   * @param {string} id - The festival event ID
   * @returns {Promise} - The festival event
   */
  const getFestivalEventById = (id) => {
    return apiCallHelper(() => axios.get(`${API_URL}/api/v1/festival-events/${id}`, getAuthHeaders()));
  };

  /**
   * Update festival event
   * @param {string} id - The festival event ID
   * @param {Object} eventData - The updated festival event data
   * @returns {Promise} - The updated festival event
   */
  const updateFestivalEvent = (id, eventData) => {
    return apiCallHelper(() => axios.put(`${API_URL}/api/v1/festival-events/${id}`, eventData, getAuthHeaders()));
  };

  /**
   * Toggle festival event active status
   * @param {string} id - The festival event ID
   * @returns {Promise} - The updated festival event
   */
  const toggleFestivalEventStatus = (id) => {
    return apiCallHelper(() => axios.patch(`${API_URL}/api/v1/festival-events/${id}/toggle-status`, {}, getAuthHeaders()));
  };

  /**
   * Delete festival event
   * @param {string} id - The festival event ID
   * @returns {Promise} - Success message
   */
  const deleteFestivalEvent = (id) => {
    return apiCallHelper(() => axios.delete(`${API_URL}/api/v1/festival-events/${id}`, getAuthHeaders()));
  };

  return {
    loading,
    error,
    createFestivalEvent,
    getFestivalEvents,
    getPublicFestivalEvents,
    getFestivalEventById,
    updateFestivalEvent,
    toggleFestivalEventStatus,
    deleteFestivalEvent
  };
};

export default useFestivalEventServices;

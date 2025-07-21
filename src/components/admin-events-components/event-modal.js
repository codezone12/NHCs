import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Globe, Image, AlertCircle } from 'lucide-react';

const EventModal = ({ isOpen, onClose, onSave, event, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    isOnline: false,
    isActive: true,
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when event is provided (edit mode)
  useEffect(() => {
    if (event && mode === 'edit') {
      const eventDate = new Date(event.date);
      const dateString = eventDate.toISOString().split('T')[0];
      const timeString = eventDate.toTimeString().slice(0, 5);

      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: dateString,
        time: timeString,
        location: event.location || '',
        isOnline: event.isOnline || false,
        isActive: event.isActive !== undefined ? event.isActive : true,
        imageUrl: event.imageUrl || ''
      });
    } else {
      // Set default values for new event
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      const timeString = '12:00';

      setFormData({
        title: '',
        description: '',
        date: dateString,
        time: timeString,
        location: '',
        isOnline: false,
        isActive: true,
        imageUrl: ''
      });
    }
  }, [event, mode]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      // Check if the selected date is in the past
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
      
      if (selectedDate < today) {
        newErrors.date = 'Cannot select a past date';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    } else if (formData.date === today) {
      // If the selected date is today, check if the time is in the future
      const now = new Date();
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      
      if (selectedDateTime <= now) {
        newErrors.time = 'Selected time must be in the future';
      }
    }
    
    if (!formData.isOnline && !formData.location.trim()) {
      newErrors.location = 'Location is required for in-person events';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Combine date and time into a single Date object
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: dateTime.toISOString(),
        location: formData.location,
        isOnline: formData.isOnline,
        isActive: formData.isActive,
        imageUrl: formData.imageUrl
      };
      
      onSave(eventData);
      setIsSubmitting(false);
    }
  };

  // Handle location/online toggle
  const handleLocationTypeChange = (isOnline) => {
    setFormData({
      ...formData,
      isOnline,
      // Clear location if switching to online
      ...(isOnline && { location: '' })
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'add' ? 'Add New Event' : 'Edit Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.title}
              </p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter event description"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.description}
              </p>
            )}
          </div>
          
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date*
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full px-3 py-2 border ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                />
                <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.date}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time*
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.time}
                </p>
              )}
            </div>
          </div>
          
          {/* Location Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleLocationTypeChange(false)}
                className={`flex items-center px-4 py-2 rounded-md ${
                  !formData.isOnline
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                <MapPin size={18} className="mr-2" />
                In-Person
              </button>
              <button
                type="button"
                onClick={() => handleLocationTypeChange(true)}
                className={`flex items-center px-4 py-2 rounded-md ${
                  formData.isOnline
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                <Globe size={18} className="mr-2" />
                Online
              </button>
            </div>
          </div>
          
          {/* Location (only if not online) */}
          {!formData.isOnline && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                  placeholder="Enter event location"
                />
                <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.location}
                </p>
              )}
            </div>
          )}
          
          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Enter image URL"
              />
              <Image size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          {/* Active Status */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Event is active and visible to users
              </label>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : mode === 'add' ? 'Create Event' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

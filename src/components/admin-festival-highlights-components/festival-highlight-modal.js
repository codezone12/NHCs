import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FestivalHighlightModal = ({ isOpen, onClose, onSave, highlight, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    icon: 'Globe',
    bgColor: 'bg-yellow-400',
    hoverBg: 'hover:bg-yellow-500',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-600',
    order: 0,
    isActive: true
  });

  const [errors, setErrors] = useState({});

  // Available icons
  const iconOptions = [
    'Globe', 'Users', 'Calendar', 'Music', 'Video', 
    'Camera', 'Heart', 'Star', 'Award', 'Book'
  ];

  // Available color schemes
  const colorSchemes = [
    {
      name: 'Yellow',
      bgColor: 'bg-yellow-400',
      hoverBg: 'hover:bg-yellow-500',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Blue',
      bgColor: 'bg-blue-500',
      hoverBg: 'hover:bg-blue-600',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Green',
      bgColor: 'bg-green-500',
      hoverBg: 'hover:bg-green-600',
      borderColor: 'border-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Red',
      bgColor: 'bg-red-500',
      hoverBg: 'hover:bg-red-600',
      borderColor: 'border-red-500',
      textColor: 'text-red-600'
    },
    {
      name: 'Purple',
      bgColor: 'bg-purple-500',
      hoverBg: 'hover:bg-purple-600',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  // Initialize form data when highlight changes
  useEffect(() => {
    if (highlight && mode === 'edit') {
      setFormData({
        title: highlight.title || '',
        content: highlight.content || '',
        icon: highlight.icon || 'Globe',
        bgColor: highlight.bgColor || 'bg-yellow-400',
        hoverBg: highlight.hoverBg || 'hover:bg-yellow-500',
        borderColor: highlight.borderColor || 'border-yellow-400',
        textColor: highlight.textColor || 'text-yellow-600',
        order: highlight.order || 0,
        isActive: highlight.isActive !== undefined ? highlight.isActive : true
      });
    } else {
      // Reset form for new highlight
      setFormData({
        title: '',
        content: '',
        icon: 'Globe',
        bgColor: 'bg-yellow-400',
        hoverBg: 'hover:bg-yellow-500',
        borderColor: 'border-yellow-400',
        textColor: 'text-yellow-600',
        order: 0,
        isActive: true
      });
    }
    setErrors({});
  }, [highlight, mode]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle color scheme selection
  const handleColorSchemeChange = (scheme) => {
    setFormData({
      ...formData,
      bgColor: scheme.bgColor,
      hoverBg: scheme.hoverBg,
      borderColor: scheme.borderColor,
      textColor: scheme.textColor
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.icon) {
      newErrors.icon = 'Icon is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === 'add' ? 'Add New Festival Highlight' : 'Edit Festival Highlight'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Content */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full border ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              {/* Icon */}
              <div className="mb-4">
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon *
                </label>
                <select
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.icon ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                {errors.icon && (
                  <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
                )}
              </div>

              {/* Color Scheme */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Scheme
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.name}
                      type="button"
                      onClick={() => handleColorSchemeChange(scheme)}
                      className={`w-8 h-8 rounded-full ${scheme.bgColor} border-2 ${
                        formData.bgColor === scheme.bgColor
                          ? 'border-gray-800'
                          : 'border-transparent'
                      }`}
                      title={scheme.name}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Order */}
              <div className="mb-4">
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Lower numbers appear first
                </p>
              </div>

              {/* Active Status */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  {mode === 'add' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalHighlightModal;

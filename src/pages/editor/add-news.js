import React, { useState, useEffect } from 'react';
import { Save, X, FileUp, Trash2, ArrowLeft } from 'lucide-react';
import { useNewsServices } from '../../apis/newsService';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNewsPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    isTrending: false,
    isActive: true
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { createNews, loading, error } = useNewsServices();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle content change from Quill editor
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        toast.error('Only image files are allowed');
        return;
      }
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image file size should be less than 2MB');
        return;
      }
      
      setImageFile(file);
      
      // Create a preview URL for the image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await createNews(formData, imageFile);
      
      if (response.success) {
        toast.success('News article created successfully!');
        // Reset form
        setFormData({
          title: '',
          content: '',
          category: '',
          isTrending: false,
          isActive: true
        });
        setImageFile(null);
        setImagePreview('');
      } else {
        toast.error(response.message || 'Failed to create news article');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while creating the news article');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error if API call fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'align'
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Article</h1>
          <p className="text-gray-500">Create and publish a new news article</p>
        </div>
        <div>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            onClick={handleSubmit}
            disabled={isSubmitting || loading}
          >
            <Save size={18} className="mr-2" />
            {isSubmitting || loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <form className="bg-white shadow-sm rounded-lg overflow-hidden" onSubmit={handleSubmit}>
        {/* Main Content Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Article Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="Enter a compelling title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="Enter news category (e.g., Politics, Technology, Sports)"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image
            </label>
            <div className="mt-1 flex items-center">
              {imagePreview ? (
                <div className="flex flex-col items-start space-y-2">
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-40 w-auto object-cover rounded-md border border-gray-300" 
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50">
                    <FileUp size={18} className="mb-1" />
                    <span className="text-sm">Upload Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">Max size: 2MB</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Article Content*
            </label>
            <div className={`border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your article content here..."
                className="h-64"
              />
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isTrending"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="isTrending" className="ml-3 text-sm text-gray-700 flex items-center">
              Mark as trending news
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewsPage;
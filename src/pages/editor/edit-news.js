import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNewsServices } from '../../apis/newsService';
import { toast } from 'react-toastify';
import { Loader2, FileUp, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNewsById, updateNews, loading, error } = useNewsServices();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    isTrending: false,
    isActive: true
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch news article data on component mount
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await getNewsById(id);
        if (response.success) {
          const { title, content, category, isTrending, isActive, imageUrl } = response.data;
          setFormData({
            title,
            content,
            category,
            isTrending,
            isActive
          });
          
          if (imageUrl) {
            setCurrentImageUrl(imageUrl);
          }
        } else {
          toast.error(response.message || 'Failed to fetch news article');
          navigate('/editor/news-list');
        }
      } catch (err) {
        toast.error('Error fetching news article');
        navigate('/editor/news-list');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  // Show error if API call fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await updateNews(id, formData, imageFile);
      
      if (response.success) {
        toast.success('News article updated successfully');
        navigate('/editor/news-list');
      } else {
        toast.error(response.message || 'Failed to update news article');
      }
    } catch (err) {
      toast.error('Error updating news article');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto text-green-600 mb-4" />
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit News Article</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                placeholder="Enter news title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Select a category</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Science">Science</option>
                <option value="World">World</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
            
            {/* Image Upload */}
            <div className="mb-4">
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
                    <p className="text-sm text-gray-500">New image selected (not yet saved)</p>
                  </div>
                ) : currentImageUrl ? (
                  <div className="flex flex-col items-start space-y-2">
                    <div className="relative">
                      <img 
                        src={currentImageUrl} 
                        alt="Current" 
                        className="h-40 w-auto object-cover rounded-md border border-gray-300" 
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500 mr-2">Current image</p>
                      <label className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700">
                        <FileUp size={14} className="mr-1" />
                        Change
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
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
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <div className={`border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter news content"
                  className="h-64"
                />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isTrending" className="ml-2 block text-sm text-gray-700">
                  Mark as trending news
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/editor/news-list')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center"
              >
                {(isSubmitting || loading) && (
                  <Loader2 size={18} className="animate-spin mr-2" />
                )}
                Update News
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNews;

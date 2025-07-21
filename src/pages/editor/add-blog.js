import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogServices } from '../../apis/blogService';
import { toast } from 'react-toastify';
import { Save, X, FileUp, Trash2, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    isFeatured: false,
    isActive: true
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { createBlog, getBlogById, updateBlog, loading, error } = useBlogServices();

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchBlogData();
    }
  }, [id]);

  // Show API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const fetchBlogData = async () => {
    try {
      const response = await getBlogById(id);
      if (response.success) {
        const blogData = response.data;
        setFormData({
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          isFeatured: blogData.isFeatured,
          isActive: blogData.isActive
        });
        
        if (blogData.pdfUrl) {
          setPdfPreview(blogData.pdfUrl);
        }
      } else {
        toast.error('Failed to fetch blog data');
        navigate('/editor/blog-list');
      }
    } catch (err) {
      console.error('Error fetching blog data:', err);
      toast.error('An error occurred while fetching blog data');
      navigate('/editor/blog-list');
    }
  };

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

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('PDF file size should be less than 5MB');
        return;
      }
      
      setPdfFile(file);
      
      // Create a preview URL for the PDF
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPdfPreview(URL.createObjectURL(file));
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
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
      let response;
      
      if (isEditMode) {
        response = await updateBlog(id, formData, pdfFile);
      } else {
        response = await createBlog(formData, pdfFile);
      }
      
      if (response.success) {
        toast.success(`Blog ${isEditMode ? 'updated' : 'created'} successfully`);
        navigate('/editor/blog-list');
      } else {
        toast.error(response.message || `Failed to ${isEditMode ? 'update' : 'create'} blog`);
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog:`, err);
      toast.error(`An error occurred while ${isEditMode ? 'updating' : 'creating'} the blog`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/editor/blog-list')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Blog' : 'Add New Blog'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Status and Featured */}
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured
              </label>
            </div>
          </div>

          {/* PDF Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF Attachment
            </label>
            <div className="mt-1 flex items-center">
              {pdfPreview ? (
                <div className="flex items-center space-x-2">
                  <a
                    href={pdfPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md flex items-center hover:bg-blue-100"
                  >
                    <FileUp size={18} className="mr-2" />
                    View PDF
                  </a>
                  <button
                    type="button"
                    onClick={removePdf}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50">
                    <FileUp size={18} className="mb-1" />
                    <span className="text-sm">Upload PDF</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">Max size: 5MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <div className={`border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your blog content here..."
                className="h-64"
              />
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/editor/blog-list')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            disabled={isSubmitting}
          >
            <X size={18} className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                {isEditMode ? 'Update Blog' : 'Create Blog'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;

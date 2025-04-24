import React, { useState } from 'react';
import { Save, Image, Clock, Tag, ChevronDown, X, Info, Calendar, Check } from 'lucide-react';

const AddNewsPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    tags: [],
    coverImage: null,
    publishType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    featured: false,
    allowComments: true,
    draft: false
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['Politics', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'World'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
    setShowCategoryDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData);
    
    // For demonstration - you would replace this with actual API call
    alert("News article submitted successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Article</h1>
          <p className="text-gray-500">Create and publish a new news article</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            onClick={() => setFormData(prev => ({ ...prev, draft: true }))}
          >
            Save as Draft
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            onClick={handleSubmit}
          >
            <Save size={18} className="mr-2" />
            Publish
          </button>
        </div>
      </div>

      <form className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Main Content Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter a compelling title"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle (Optional)
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add a subtitle or short description"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Article Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="12"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Write your article content here..."
            ></textarea>
          </div>
        </div>
        
        {/* Media Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Cover Image</h2>
          
          <div className="flex items-center space-x-4">
            <div className="w-48 h-32 bg-gray-100 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center overflow-hidden relative">
              {previewImage ? (
                <div className="w-full h-full relative">
                  <img 
                    src={previewImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData(prev => ({ ...prev, coverImage: null }));
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Image size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add cover image</span>
                </>
              )}
              <input 
                type="file" 
                id="coverImage"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">
                Recommended: 1200 x 628 pixels, JPG or PNG format.
              </p>
              <p className="text-sm text-gray-500">
                A compelling cover image increases engagement and shares.
              </p>
            </div>
          </div>
        </div>
        
        {/* Categories and Tags */}
        <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className={formData.category ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.category || 'Select category'}
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add tag and press Enter"
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="absolute right-2 p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                >
                  <Tag size={16} />
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                      <button 
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Publishing Options */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Publishing Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                When to publish?
              </label>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="publishNow"
                    name="publishType"
                    value="now"
                    checked={formData.publishType === 'now'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="publishNow" className="ml-3 text-sm text-gray-700 flex items-center">
                    <Clock size={16} className="mr-2" />
                    Publish immediately
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="publishLater"
                    name="publishType"
                    value="scheduled"
                    checked={formData.publishType === 'scheduled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="publishLater" className="ml-3 text-sm text-gray-700 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Schedule for later
                  </label>
                </div>
                
                {formData.publishType === 'scheduled' && (
                  <div className="pl-7 flex space-x-3">
                    <div className="w-1/2">
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="time"
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Additional Options
              </label>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="featured" className="ml-3 text-sm text-gray-700 flex items-center">
                    <span className="mr-2 flex-shrink-0 w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                      <Check size={12} />
                    </span>
                    Mark as featured article
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowComments"
                    name="allowComments"
                    checked={formData.allowComments}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="allowComments" className="ml-3 text-sm text-gray-700">
                    Enable comments
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Buttons */}
        <div className="p-6 flex justify-between items-center bg-gray-50">
          <div className="flex items-center text-sm text-gray-500">
            <Info size={16} className="mr-2" />
            All fields marked with * are required
          </div>
          <div className="flex space-x-3">
            <button 
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setFormData(prev => ({ ...prev, draft: true }))}
            >
              Save as Draft
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              onClick={handleSubmit}
            >
              <Save size={18} className="mr-2" />
              Publish Article
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewsPage;
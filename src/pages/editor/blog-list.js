import React, { useState, useEffect } from 'react';
import { useBlogServices } from '../../apis/blogService';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, AlertCircle, CheckCircle, Star, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    active: '',
    featured: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getBlogs, deleteBlog, toggleBlogStatus, toggleFeaturedStatus, loading, error } = useBlogServices();

  // Fetch blogs on component mount and when filters or pagination change
  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, pagination.limit, filters]);

  // Show error if API call fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        active: filters.active,
        featured: filters.featured,
        category: filters.category
      };

      const response = await getBlogs(params);
      
      if (response.success) {
        setBlogs(response.data.blogs);
        setPagination(response.data.pagination);
      } else {
        toast.error(response.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({
      ...prev,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination(prev => ({
        ...prev,
        page: newPage
      }));
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await toggleBlogStatus(id);
      if (response.success) {
        setBlogs(blogs.map(item => 
          item.id === id ? { ...item, isActive: !item.isActive } : item
        ));
        toast.success('Blog status updated successfully');
      } else {
        toast.error(response.message || 'Failed to update blog status');
      }
    } catch (err) {
      toast.error('Error updating blog status');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await toggleFeaturedStatus(id);
      if (response.success) {
        setBlogs(blogs.map(item => 
          item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
        ));
        toast.success('Featured status updated successfully');
      } else {
        toast.error(response.message || 'Failed to update featured status');
      }
    } catch (err) {
      toast.error('Error updating featured status');
    }
  };

  const openDeleteModal = (blogItem) => {
    setSelectedBlog(blogItem);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;
    
    try {
      const response = await deleteBlog(selectedBlog.id);
      if (response.success) {
        setBlogs(blogs.filter(item => item.id !== selectedBlog.id));
        toast.success('Blog deleted successfully');
        closeDeleteModal();
      } else {
        toast.error(response.message || 'Failed to delete blog');
      }
    } catch (err) {
      toast.error('Error deleting blog');
    }
  };

  const openPdf = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
        <Link
          to="/editor/add-blog"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search blogs..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          
          <div>
            <select
              name="active"
              value={filters.active}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          
          <div>
            <select
              name="featured"
              value={filters.featured}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Featured</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
        </form>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
            <p className="mt-2 text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">No blog posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.pdfUrl ? (
                        <button
                          onClick={() => openPdf(item.pdfUrl)}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <FileText size={12} className="mr-1" />
                          View PDF
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">No PDF</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.isActive ? (
                          <CheckCircle size={12} className="mr-1" />
                        ) : (
                          <AlertCircle size={12} className="mr-1" />
                        )}
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(item.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isFeatured
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <Star size={12} className="mr-1" />
                        {item.isFeatured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/editor/edit-blog/${item.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  pagination.page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  pagination.page === pagination.pages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      pagination.page === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {[...Array(pagination.pages).keys()].map((page) => {
                    const pageNumber = page + 1;
                    // Show only a window of pages around the current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === pagination.pages ||
                      (pageNumber >= pagination.page - 1 && pageNumber <= pagination.page + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pagination.page === pageNumber
                              ? 'z-10 bg-green-50 border-green-500 text-green-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === 2 && pagination.page > 3) ||
                      (pageNumber === pagination.pages - 1 && pagination.page < pagination.pages - 2)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      pagination.page === pagination.pages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Blog</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this blog post? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;

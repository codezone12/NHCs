import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Filter, X, AlertCircle, MapPin, Car, Train } from 'lucide-react';
import useTransportationServices from '../../apis/transportationService';
import Pagination from '../../components/admin-users-components/pagination';
import { toast } from 'react-toastify';

const Transportations = () => {
  // State for transportations data
  const [transportations, setTransportations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // State for transportation modal
  const [showModal, setShowModal] = useState(false);
  const [currentTransportation, setCurrentTransportation] = useState(null);
  const [formData, setFormData] = useState({
    type: 'public',
    title: '',
    icon: 'Train',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    details: [],
    tip: '',
    tipColor: 'text-blue-600',
    order: 0,
    isActive: true
  });

  // State for detail items (dynamic form fields)
  const [detailItems, setDetailItems] = useState([{ label: '', value: '' }]);

  const {
    loading,
    error,
    getTransportations,
    createTransportation,
    updateTransportation,
    toggleTransportationStatus,
    deleteTransportation,
  } = useTransportationServices();

  // Fetch transportations with current pagination and filters
  const fetchTransportations = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined,
        active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined
      };
      
      const response = await getTransportations(params);
      
      if (response.success) {
        setTransportations(response.data.transportations || []);
        setTotalPages(response.data.pagination?.pages || 1);
        setTotalResults(response.data.pagination?.total || 0);
      } else {
        setTransportations([]);
        setTotalPages(1);
        setTotalResults(0);
      }
    } catch (error) {
      toast.error('Failed to fetch transportation options');
      console.error('Error fetching transportation options:', error);
      setTransportations([]);
      setTotalPages(1);
      setTotalResults(0);
    }
  };

  // Initial fetch and when filters/pagination change
  useEffect(() => {
    fetchTransportations();
  }, [currentPage, statusFilter, typeFilter, searchQuery]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Handle toggle filters
  const handleToggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  // Open modal for adding new transportation
  const handleAddTransportation = () => {
    setCurrentTransportation(null);
    setFormData({
      type: 'public',
      title: '',
      icon: 'Train',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900',
      details: [],
      tip: '',
      tipColor: 'text-blue-600',
      order: 0,
      isActive: true
    });
    setDetailItems([{ label: '', value: '' }]);
    setShowModal(true);
  };

  // Open modal for editing transportation
  const handleEditTransportation = (transportation) => {
    setCurrentTransportation(transportation);
    
    // Convert details array to form items
    let detailsArray = [];
    if (transportation.details && Array.isArray(transportation.details)) {
      detailsArray = transportation.details.map(detail => ({
        label: detail.label || '',
        value: detail.value || ''
      }));
    }
    
    if (detailsArray.length === 0) {
      detailsArray = [{ label: '', value: '' }];
    }
    
    setDetailItems(detailsArray);
    
    setFormData({
      type: transportation.type || 'public',
      title: transportation.title || '',
      icon: transportation.icon || 'Train',
      bgColor: transportation.bgColor || 'bg-blue-50',
      textColor: transportation.textColor || 'text-blue-900',
      details: transportation.details || [],
      tip: transportation.tip || '',
      tipColor: transportation.tipColor || 'text-blue-600',
      order: transportation.order || 0,
      isActive: transportation.isActive
    });
    
    setShowModal(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle detail item change
  const handleDetailItemChange = (index, field, value) => {
    const updatedItems = [...detailItems];
    updatedItems[index][field] = value;
    setDetailItems(updatedItems);
  };

  // Add new detail item
  const handleAddDetailItem = () => {
    setDetailItems([...detailItems, { label: '', value: '' }]);
  };

  // Remove detail item
  const handleRemoveDetailItem = (index) => {
    if (detailItems.length > 1) {
      const updatedItems = detailItems.filter((_, i) => i !== index);
      setDetailItems(updatedItems);
    }
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty detail items
    const validDetails = detailItems.filter(item => item.label.trim() !== '' || item.value.trim() !== '');
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      details: validDetails
    };
    
    try {
      if (currentTransportation) {
        // Update existing transportation
        const response = await updateTransportation(currentTransportation.id, submissionData);
        if (response.success) {
          toast.success('Transportation option updated successfully');
          setShowModal(false);
          fetchTransportations();
        }
      } else {
        // Create new transportation
        const response = await createTransportation(submissionData);
        if (response.success) {
          toast.success('Transportation option created successfully');
          setShowModal(false);
          fetchTransportations();
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save transportation option');
    }
  };

  // Handle toggle transportation status
  const handleToggleStatus = async (id) => {
    try {
      const response = await toggleTransportationStatus(id);
      if (response.success) {
        toast.success(`Transportation option ${response.data.isActive ? 'activated' : 'deactivated'} successfully`);
        fetchTransportations();
      }
    } catch (error) {
      toast.error('Failed to toggle transportation status');
    }
  };

  // Handle delete transportation
  const handleDeleteTransportation = async (id) => {
    if (window.confirm('Are you sure you want to delete this transportation option?')) {
      try {
        const response = await deleteTransportation(id);
        if (response.success) {
          toast.success('Transportation option deleted successfully');
          fetchTransportations();
        }
      } catch (error) {
        toast.error('Failed to delete transportation option');
      }
    }
  };

  // Get icon component based on icon name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Train':
        return <Train className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Train className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transportation Options</h1>
        <button
          onClick={handleAddTransportation}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Option
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleToggleFilters}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <div className="ml-4 text-sm text-gray-500">
            {totalResults} {totalResults === 1 ? 'option' : 'options'} found
          </div>
        </div>

        {filtersVisible && (
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Type filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="public">Public Transport</option>
                  <option value="car">Car</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <form onSubmit={handleSearchSubmit} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="bg-gray-100 px-3 border-y border-r border-gray-300"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading transportation options</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Transportations table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 ml-2">Loading options...</p>
          </div>
        ) : transportations.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No transportation options found. Create your first option!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Option
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transportations.map((transportation) => (
                  <tr key={transportation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md mr-3 ${transportation.bgColor}`}>
                          {getIconComponent(transportation.icon)}
                        </div>
                        <div className="font-medium text-gray-900">{transportation.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{transportation.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {transportation.details && Array.isArray(transportation.details) && transportation.details.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {transportation.details.slice(0, 2).map((detail, index) => (
                              <li key={index} className="truncate max-w-xs">
                                <span className="font-medium">{detail.label}:</span> {detail.value}
                              </li>
                            ))}
                            {transportation.details.length > 2 && (
                              <li className="text-gray-400">
                                +{transportation.details.length - 2} more...
                              </li>
                            )}
                          </ul>
                        ) : (
                          <span className="text-gray-400">No details</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transportation.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {transportation.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditTransportation(transportation)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(transportation.id)}
                        className={`${
                          transportation.isActive ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'
                        } mr-3`}
                      >
                        {transportation.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleDeleteTransportation(transportation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {transportations.length > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Transportation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentTransportation ? 'Edit Transportation Option' : 'Add New Transportation Option'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Med kollektivtrafik"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public Transport</option>
                      <option value="car">Car</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Train">Train</option>
                      <option value="Car">Car</option>
                      <option value="MapPin">Map Pin</option>
                    </select>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                    <select
                      name="bgColor"
                      value={formData.bgColor}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bg-blue-50">Blue</option>
                      <option value="bg-green-50">Green</option>
                      <option value="bg-red-50">Red</option>
                      <option value="bg-yellow-50">Yellow</option>
                      <option value="bg-purple-50">Purple</option>
                      <option value="bg-gray-50">Gray</option>
                    </select>
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                    <select
                      name="textColor"
                      value={formData.textColor}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text-blue-900">Blue</option>
                      <option value="text-green-900">Green</option>
                      <option value="text-red-900">Red</option>
                      <option value="text-yellow-900">Yellow</option>
                      <option value="text-purple-900">Purple</option>
                      <option value="text-gray-900">Gray</option>
                    </select>
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      Active
                    </label>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Details</label>
                    <button
                      type="button"
                      onClick={handleAddDetailItem}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Detail
                    </button>
                  </div>
                  
                  {detailItems.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleDetailItemChange(index, 'label', e.target.value)}
                          placeholder="Label"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleDetailItemChange(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDetailItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tip */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tip (Optional)</label>
                  <input
                    type="text"
                    name="tip"
                    value={formData.tip}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rekommenderat: Använd SL-appen för aktuella tider"
                  />
                </div>

                {/* Tip Color */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tip Color</label>
                  <select
                    name="tipColor"
                    value={formData.tipColor}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text-blue-600">Blue</option>
                    <option value="text-green-600">Green</option>
                    <option value="text-red-600">Red</option>
                    <option value="text-yellow-600">Yellow</option>
                    <option value="text-purple-600">Purple</option>
                    <option value="text-gray-600">Gray</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {currentTransportation ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transportations;

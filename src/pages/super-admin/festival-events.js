import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, PlusCircle, Filter, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import useFestivalEventServices from '../../apis/festivalEventService';
import Pagination from '../../components/admin-users-components/pagination';
import { toast } from 'react-toastify';

const FestivalEvents = () => {
  // State for events data
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // State for event modal
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    isOnline: false,
    isActive: true,
    imageUrl: '',
  });

  const {
    loading,
    error,
    getFestivalEvents,
    createFestivalEvent,
    updateFestivalEvent,
    toggleFestivalEventStatus,
    deleteFestivalEvent,
  } = useFestivalEventServices();

  // Fetch events with current pagination and filters
  const fetchEvents = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined,
        isActive: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
        upcoming: timeFilter === 'upcoming' ? true : undefined,
        past: timeFilter === 'past' ? true : undefined,
      };
      
      const response = await getFestivalEvents(params);
      
      if (response.success) {
        setEvents(response.data.festivalEvents || []);
        setTotalPages(response.data.pagination?.pages || 1);
        setTotalResults(response.data.pagination?.total || 0);
      } else {
        setEvents([]);
        setTotalPages(1);
        setTotalResults(0);
      }
    } catch (error) {
      toast.error('Failed to fetch festival events');
      console.error('Error fetching festival events:', error);
      setEvents([]);
      setTotalPages(1);
      setTotalResults(0);
    }
  };

  // Initial fetch and when filters/pagination change
  useEffect(() => {
    fetchEvents();
  }, [currentPage, statusFilter, timeFilter, searchQuery]);

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

  // Handle time filter change
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
    setCurrentPage(1);
  };

  // Open modal for adding new event
  const handleAddEvent = () => {
    setCurrentEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      isOnline: false,
      isActive: true,
      imageUrl: '',
    });
    setShowModal(true);
  };

  // Open modal for editing event
  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    
    // Format the date correctly for datetime-local input
    const eventDate = event.date ? new Date(event.date) : new Date();
    const formattedDate = eventDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDThh:mm
    
    setFormData({
      title: event.title,
      description: event.description,
      date: formattedDate,
      location: event.location || '',
      isOnline: event.isOnline || false,
      isActive: event.isActive,
      imageUrl: event.imageUrl || '',
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

  // Handle form submit (create or update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentEvent) {
        // Update existing event
        const response = await updateFestivalEvent(currentEvent.id, formData);
        if (response.success) {
          toast.success('Festival event updated successfully');
          setShowModal(false);
          fetchEvents();
        }
      } else {
        // Create new event
        const response = await createFestivalEvent(formData);
        if (response.success) {
          toast.success('Festival event created successfully');
          setShowModal(false);
          fetchEvents();
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save festival event');
    }
  };

  // Handle toggle event status
  const handleToggleStatus = async (id) => {
    try {
      const response = await toggleFestivalEventStatus(id);
      if (response.success) {
        toast.success(`Festival event ${response.data.isActive ? 'activated' : 'deactivated'} successfully`);
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to toggle festival event status');
    }
  };

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this festival event?')) {
      try {
        const response = await deleteFestivalEvent(id);
        if (response.success) {
          toast.success('Festival event deleted successfully');
          fetchEvents();
        }
      } catch (error) {
        toast.error('Failed to delete festival event');
      }
    }
  };

  // Format date for display
  const formatEventDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy - h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Festival Events</h1>
        <button
          onClick={handleAddEvent}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Event
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
            {totalResults} {totalResults === 1 ? 'event' : 'events'} found
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

              {/* Time filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  value={timeFilter}
                  onChange={handleTimeFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
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
                    placeholder="Search events..."
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
            <p className="font-medium">Error loading events</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Events table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 ml-2">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No festival events found. Create your first event!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Location
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
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-12 w-12 object-cover rounded-md mr-3"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar size={16} className="mr-1" />
                          {formatEventDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {event.isOnline ? (
                            <span className="inline-flex items-center">
                              <Clock size={16} className="mr-1" /> Online Event
                            </span>
                          ) : (
                            <span className="inline-flex items-center">
                              <MapPin size={16} className="mr-1" /> {event.location || 'No location'}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleToggleStatus(event.id)}
                          className={`${
                            event.isActive ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'
                          }`}
                          title={event.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {event.isActive ? (
                            <span className="text-amber-600">Deactivate</span>
                          ) : (
                            <span className="text-green-600">Activate</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
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
                    {currentEvent ? 'Edit Festival Event' : 'Add New Festival Event'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit}>
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
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Date */}
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().slice(0, 16)} // Disable past dates
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Online Event */}
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="isOnline"
                      name="isOnline"
                      checked={formData.isOnline}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isOnline" className="ml-2 block text-sm text-gray-900">
                      This is an online event
                    </label>
                  </div>

                  {/* Location (only if not online) */}
                  {!formData.isOnline && (
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Image URL */}
                  <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Active Status */}
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
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
                      onClick={() => setShowModal(false)}
                      className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                      {currentEvent ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FestivalEvents;

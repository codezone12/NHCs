import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, Filter, X, AlertCircle } from 'lucide-react';
import { useEventServices } from '../../apis/eventService';
import Pagination from '../../components/admin-users-components/pagination';
import EventModal from '../../components/admin-events-components/event-modal';
import EventRow from '../../components/admin-events-components/event-row';

const EventsPage = () => {
  // State for events data
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [dateRangeFilter, setDateRangeFilter] = useState({
    from: '',
    to: ''
  });
  
  // State for event modal
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit'
  
  // Get event services
  const { 
    loading, 
    error, 
    getEvents, 
    createEvent,
    updateEvent,
    deleteEvent,
    toggleEventStatus
  } = useEventServices();

  // Fetch events when component mounts or filters change
  useEffect(() => {
    fetchEvents();
  }, [statusFilter, timeFilter, searchQuery, dateRangeFilter, currentPage]);

  const fetchEvents = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...(statusFilter !== 'all' && { active: statusFilter === 'active' }),
        ...(timeFilter === 'upcoming' && { upcoming: true }),
        ...(timeFilter === 'past' && { past: true }),
        ...(searchQuery && { search: searchQuery }),
        ...(dateRangeFilter.from && { dateFrom: dateRangeFilter.from }),
        ...(dateRangeFilter.to && { dateTo: dateRangeFilter.to })
      };

      const response = await getEvents(params);
      
      if (response.success) {
        setEvents(response.data.events);
        setTotalPages(response.data.pagination.pages);
        setTotalResults(response.data.pagination.total);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Handle time filter change
  const handleTimeFilterChange = (time) => {
    setTimeFilter(time);
    setCurrentPage(1);
  };

  // Handle date range filter change
  const handleDateRangeChange = (field, value) => {
    setDateRangeFilter({
      ...dateRangeFilter,
      [field]: value
    });
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('all');
    setTimeFilter('all');
    setSearchQuery('');
    setDateRangeFilter({ from: '', to: '' });
    setCurrentPage(1);
  };

  // Handle event selection
  const handleSelectEvent = (id) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(selectedEvents.filter(eventId => eventId !== id));
    } else {
      setSelectedEvents([...selectedEvents, id]);
    }
  };

  // Handle select all events
  const handleSelectAllEvents = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map(event => event.id));
    }
  };

  // Open add event modal
  const openAddEventModal = () => {
    setCurrentEvent(null);
    setModalMode('add');
    setEventModalVisible(true);
  };

  // Open edit event modal
  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setModalMode('edit');
    setEventModalVisible(true);
  };

  // Handle event save (create or update)
  const handleSaveEvent = async (eventData) => {
    try {
      if (modalMode === 'add') {
        await createEvent(eventData);
      } else {
        await updateEvent(currentEvent.id, eventData);
      }
      
      setEventModalVisible(false);
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  // Handle toggle event status
  const handleToggleStatus = async (id) => {
    try {
      await toggleEventStatus(id);
      fetchEvents();
    } catch (err) {
      console.error('Error toggling event status:', err);
    }
  };

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
        <button
          onClick={openAddEventModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <button
                onClick={() => handleStatusFilterChange('all')}
                className={`px-3 py-1 rounded-md ${
                  statusFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => handleStatusFilterChange('active')}
                className={`px-3 py-1 rounded-md ${
                  statusFilter === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusFilterChange('inactive')}
                className={`px-3 py-1 rounded-md ${
                  statusFilter === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100'
                }`}
              >
                Inactive
              </button>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => handleTimeFilterChange('all')}
                className={`px-3 py-1 rounded-md ${
                  timeFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => handleTimeFilterChange('upcoming')}
                className={`px-3 py-1 rounded-md ${
                  timeFilter === 'upcoming' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => handleTimeFilterChange('past')}
                className={`px-3 py-1 rounded-md ${
                  timeFilter === 'past' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
                }`}
              >
                Past
              </button>
            </div>

            <button
              onClick={toggleFilters}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-md"
            >
              <Filter size={16} className="mr-1" />
              {filtersVisible ? 'Hide Filters' : 'More Filters'}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {filtersVisible && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateRangeFilter.from}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateRangeFilter.to}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(statusFilter !== 'all' || timeFilter !== 'all' || searchQuery || dateRangeFilter.from || dateRangeFilter.to) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {statusFilter !== 'all' && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center text-sm">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter('all')}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {timeFilter !== 'all' && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center text-sm">
                Time: {timeFilter}
                <button
                  onClick={() => setTimeFilter('all')}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center text-sm">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {dateRangeFilter.from && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center text-sm">
                From: {dateRangeFilter.from}
                <button
                  onClick={() => handleDateRangeChange('from', '')}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {dateRangeFilter.to && (
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center text-sm">
                To: {dateRangeFilter.to}
                <button
                  onClick={() => handleDateRangeChange('to', '')}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Events Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto" />
            <p className="mt-4 text-gray-600">Error loading events: {error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar size={48} className="text-gray-400 mx-auto" />
            <p className="mt-4 text-gray-600">No events found</p>
            <button
              onClick={openAddEventModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add New Event
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded"
                      checked={selectedEvents.length === events.length && events.length > 0}
                      onChange={handleSelectAllEvents}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    isSelected={selectedEvents.includes(event.id)}
                    onSelect={handleSelectEvent}
                    onToggleStatus={handleToggleStatus}
                    onEditEvent={handleEditEvent}
                    onDeleteEvent={handleDeleteEvent}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {events.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={totalResults}
          />
        </div>
      )}

      {/* Event Modal */}
      {eventModalVisible && (
        <EventModal
          isOpen={eventModalVisible}
          onClose={() => setEventModalVisible(false)}
          onSave={handleSaveEvent}
          event={currentEvent}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default EventsPage;

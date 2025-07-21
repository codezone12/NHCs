import React, { useState, useEffect } from 'react';
import { PlusCircle, Filter, X, AlertCircle } from 'lucide-react';
import { useFestivalHighlightServices } from '../../apis/festivalHighlightService';
import Pagination from '../../components/admin-users-components/pagination';
import FestivalHighlightModal from '../../components/admin-festival-highlights-components/festival-highlight-modal';
import FestivalHighlightRow from '../../components/admin-festival-highlights-components/festival-highlight-row';

const FestivalHighlightsPage = () => {
  // State for highlights data
  const [highlights, setHighlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // State for highlight modal
  const [highlightModalVisible, setHighlightModalVisible] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit'
  
  // Get festival highlight services
  const { 
    loading, 
    error, 
    getFestivalHighlights, 
    createFestivalHighlight,
    updateFestivalHighlight,
    deleteFestivalHighlight,
    toggleFestivalHighlightStatus
  } = useFestivalHighlightServices();

  // Fetch highlights when component mounts or filters change
  useEffect(() => {
    fetchHighlights();
  }, [statusFilter, searchQuery, currentPage]);

  const fetchHighlights = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined,
        isActive: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
        sort: 'order:asc'
      };
      
      const response = await getFestivalHighlights(params);
      
      if (response.success && response.data) {
        setHighlights(response.data.highlights || []);
        setTotalPages(response.data.pagination?.pages || 1);
        setTotalResults(response.data.pagination?.total || 0);
      } else {
        setHighlights([]);
        setTotalPages(1);
        setTotalResults(0);
      }
    } catch (err) {
      console.error('Error fetching highlights:', err);
      setHighlights([]);
      setTotalPages(1);
      setTotalResults(0);
    }
  };

  // Handle add new highlight
  const handleAddHighlight = () => {
    setCurrentHighlight(null);
    setModalMode('add');
    setHighlightModalVisible(true);
  };

  // Handle edit highlight
  const handleEditHighlight = (highlight) => {
    setCurrentHighlight(highlight);
    setModalMode('edit');
    setHighlightModalVisible(true);
  };

  // Handle save highlight (create or update)
  const handleSaveHighlight = async (highlightData) => {
    try {
      if (modalMode === 'add') {
        await createFestivalHighlight(highlightData);
      } else {
        await updateFestivalHighlight(currentHighlight.id, highlightData);
      }
      
      setHighlightModalVisible(false);
      fetchHighlights();
    } catch (err) {
      console.error('Error saving highlight:', err);
    }
  };

  // Handle delete highlight
  const handleDeleteHighlight = async (id) => {
    if (window.confirm('Are you sure you want to delete this highlight?')) {
      try {
        await deleteFestivalHighlight(id);
        fetchHighlights();
      } catch (err) {
        console.error('Error deleting highlight:', err);
      }
    }
  };

  // Handle toggle highlight status
  const handleToggleStatus = async (id) => {
    try {
      await toggleFestivalHighlightStatus(id);
      fetchHighlights();
    } catch (err) {
      console.error('Error toggling highlight status:', err);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Festival Highlights</h1>
        <button
          onClick={handleAddHighlight}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Highlight
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
            {totalResults} {totalResults === 1 ? 'highlight' : 'highlights'} found
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
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or content..."
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
                    Search
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
            <p className="font-medium">Error loading highlights</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Highlights table */}
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading highlights...</p>
                  </td>
                </tr>
              ) : highlights.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No highlights found
                  </td>
                </tr>
              ) : (
                highlights.map((highlight) => (
                  <FestivalHighlightRow
                    key={highlight.id}
                    highlight={highlight}
                    onEdit={() => handleEditHighlight(highlight)}
                    onDelete={() => handleDeleteHighlight(highlight.id)}
                    onToggleStatus={() => handleToggleStatus(highlight.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

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

      {/* Festival Highlight Modal */}
      {highlightModalVisible && (
        <FestivalHighlightModal
          isOpen={highlightModalVisible}
          onClose={() => setHighlightModalVisible(false)}
          onSave={handleSaveHighlight}
          highlight={currentHighlight}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default FestivalHighlightsPage;

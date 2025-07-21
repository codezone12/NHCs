import React from 'react';
import { Search, Filter, ChevronDown, Mail, Download, Trash2, RefreshCw } from 'lucide-react';

const SearchAndActions = ({ 
  searchQuery, 
  onSearchChange, 
  onFiltersToggle, 
  filtersVisible,
  selectedUsers, 
  onEmailUsers, 
  onExportUsers, 
  onDeleteUsers,
  showResetFilters,
  onResetFilters 
}) => (
  <div className="p-4">
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search users by name or email"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter Button */}
      <button 
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        onClick={onFiltersToggle}
      >
        <Filter size={16} className="mr-2" />
        Filters
        <ChevronDown size={16} className="ml-1" />
      </button>

      {/* Actions for selected users */}
      {selectedUsers.length > 0 && (
        <div className="flex gap-2">
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={onEmailUsers}
          >
            <Mail size={16} className="mr-1" />
            Email
          </button>
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={onExportUsers}
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            onClick={onDeleteUsers}
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </button>
        </div>
      )}

      {/* Reset filters button */}
      {showResetFilters && (
        <button 
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={onResetFilters}
        >
          <RefreshCw size={16} className="mr-1" />
          Reset Filters
        </button>
      )}
    </div>
  </div>
);

export default SearchAndActions;
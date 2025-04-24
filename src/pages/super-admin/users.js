import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MoreHorizontal, Mail, Download, Trash2, UserPlus, RefreshCw } from 'lucide-react';

const UsersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({
    from: '',
    to: ''
  });

  // Dummy user data
  const users = [
    { id: 1, name: 'Michael Scott', email: 'michael@example.com', role: 'Admin', status: 'Active', date: '2025-04-10', timelines: 12, avatar: 'MS' },
    { id: 2, name: 'Jim Halpert', email: 'jim@example.com', role: 'Editor', status: 'Active', date: '2025-03-25', timelines: 8, avatar: 'JH' },
    { id: 3, name: 'Pam Beesly', email: 'pam@example.com', role: 'Viewer', status: 'Inactive', date: '2025-04-05', timelines: 3, avatar: 'PB' },
    { id: 4, name: 'Dwight Schrute', email: 'dwight@example.com', role: 'Editor', status: 'Pending', date: '2025-04-15', timelines: 15, avatar: 'DS' },
    { id: 5, name: 'Angela Martin', email: 'angela@example.com', role: 'Viewer', status: 'Active', date: '2025-03-12', timelines: 2, avatar: 'AM' },
    { id: 6, name: 'Oscar Martinez', email: 'oscar@example.com', role: 'Editor', status: 'Active', date: '2025-02-28', timelines: 9, avatar: 'OM' },
    { id: 7, name: 'Kevin Malone', email: 'kevin@example.com', role: 'Viewer', status: 'Inactive', date: '2025-01-20', timelines: 1, avatar: 'KM' },
    { id: 8, name: 'Stanley Hudson', email: 'stanley@example.com', role: 'Viewer', status: 'Active', date: '2025-03-05', timelines: 4, avatar: 'SH' },
  ];

  // Filter users based on criteria
  const filteredUsers = users.filter(user => {
    // Search query filter
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Role filter
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRangeFilter.from) {
      matchesDateRange = matchesDateRange && new Date(user.date) >= new Date(dateRangeFilter.from);
    }
    if (dateRangeFilter.to) {
      matchesDateRange = matchesDateRange && new Date(user.date) <= new Date(dateRangeFilter.to);
    }
    
    // Main filter (tabs)
    if (selectedFilter === 'active') {
      return matchesSearch && user.status === 'Active' && matchesRole && matchesDateRange;
    } else if (selectedFilter === 'inactive') {
      return matchesSearch && user.status === 'Inactive' && matchesRole && matchesDateRange;
    } else if (selectedFilter === 'pending') {
      return matchesSearch && user.status === 'Pending' && matchesRole && matchesDateRange;
    }
    
    return matchesSearch && matchesStatus && matchesRole && matchesDateRange;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'timelines') {
      return sortDirection === 'asc' 
        ? a.timelines - b.timelines 
        : b.timelines - a.timelines;
    }
    return 0;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map(user => user.id));
    }
  };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleFilterReset = () => {
    setStatusFilter('all');
    setRoleFilter('all');
    setDateRangeFilter({ from: '', to: '' });
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <UserPlus size={16} className="mr-2" />
            Add User
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button 
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  selectedFilter === 'all' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedFilter('all')}
              >
                All Users
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  selectedFilter === 'active' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedFilter('active')}
              >
                Active
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  selectedFilter === 'inactive' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedFilter('inactive')}
              >
                Inactive
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  selectedFilter === 'pending' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedFilter('pending')}
              >
                Pending
              </button>
            </nav>
          </div>

          {/* Search and Filter Actions */}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <Filter size={16} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-1" />
              </button>

              {/* Actions for selected users */}
              {selectedUsers.length > 0 && (
                <div className="flex gap-2">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Mail size={16} className="mr-1" />
                    Email
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Download size={16} className="mr-1" />
                    Export
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              )}

              {/* Reset filters button */}
              {(statusFilter !== 'all' || roleFilter !== 'all' || dateRangeFilter.from || dateRangeFilter.to) && (
                <button 
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={handleFilterReset}
                >
                  <RefreshCw size={16} className="mr-1" />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Advanced filters panel */}
            {filtersVisible && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Status filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  {/* Role filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>

                  {/* Date range filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        className="block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={dateRangeFilter.from}
                        onChange={(e) => setDateRangeFilter({...dateRangeFilter, from: e.target.value})}
                      />
                      <input
                        type="date"
                        className="block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={dateRangeFilter.to}
                        onChange={(e) => setDateRangeFilter({...dateRangeFilter, to: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded"
                        checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Name</span>
                      {sortBy === 'name' && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('date')}
                  >
                    <div className="flex items-center">
                      <span>Join Date</span>
                      {sortBy === 'date' && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('timelines')}
                  >
                    <div className="flex items-center">
                      <span>Timelines</span>
                      {sortBy === 'timelines' && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.length > 0 ? (
                  sortedUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelectUser(user.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            {user.avatar}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClassName(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.timelines}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                      No users found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedUsers.length}</span> of{' '}
                  <span className="font-medium">{sortedUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                  </button>
                  <button className="bg-blue-600 border-blue-600 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 transform -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
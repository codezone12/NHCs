import React, { useState, useEffect } from 'react';
import PageHeader from './../../components/admin-users-components/page-header';
import FilterTabs from './../../components/admin-users-components/filter-tabs';
import SearchAndActions from './../../components/admin-users-components/search-and-actions';
import AdvancedFilters from './../../components/admin-users-components/advanced-filters';
import UsersTable from './../../components/admin-users-components/users-table';
import Pagination from './../../components/admin-users-components/pagination';
import AddUserComponent from '../../components/admin-users-components/add-user-component';
import EditUserModal from '../../components/admin-users-components/edit-user-modal';
import UpdatePasswordModal from '../../components/admin-users-components/update-password-modal';
import { useUserServices } from '../../apis/userService'; // Adjust path as needed

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
  const [addUserFormVisible, setAddUserFormVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { 
    loading, 
    error, 
    getUsers, 
    deleteUser, 
    deleteUsers, 
    toggleUserStatus, 
    updateUser 
  } = useUserServices();

  // Fetch users when component mounts or filters change
  useEffect(() => {
    fetchUsers();
  }, [selectedFilter, searchQuery, sortBy, sortDirection, statusFilter, roleFilter, dateRangeFilter, currentPage]);

  const fetchUsers = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10, // Adjust as needed
        search: searchQuery || undefined,
        status: selectedFilter !== 'all' ? selectedFilter : (statusFilter !== 'all' ? statusFilter : undefined),
        role: roleFilter !== 'all' ? roleFilter : undefined,
        sortBy: sortBy,
        sortDirection: sortDirection,
        dateFrom: dateRangeFilter.from || undefined,
        dateTo: dateRangeFilter.to || undefined,
      };

      const response = await getUsers(params);
      
      if (response) {
        setUsers(response.users || response.data.users || response);
        setTotalPages(response.totalPages || 1);
        setTotalResults(response.total || response.count || (response.users ? response.users.length : 0));
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleToggleAddUserForm = () => {
    setAddUserFormVisible(!addUserFormVisible);
  };

  const handleUserAdded = (newUser) => {
    setAddUserFormVisible(false);
    
    // Add the new user to the current users list
    if (newUser) {
      // Ensure the new user has all required fields with consistent property names
      const formattedUser = {
        id: newUser.id || newUser._id,
        name: newUser.name || '',
        email: newUser.email || '',
        role: newUser.role || 'EDITOR',
        isActive: newUser.isActive !== undefined ? newUser.isActive : true,
        createdAt: newUser.createdAt || new Date().toISOString(),
        updatedAt: newUser.updatedAt || new Date().toISOString()
      };
      
      // Add the new user to the beginning of the list
      setUsers(prevUsers => [formattedUser, ...prevUsers]);
      
      // Update total results count
      setTotalResults(prevTotal => prevTotal + 1);
      
      // Refresh the users list to ensure consistency with backend
      fetchUsers();
    }
  };

  // Event handlers
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
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
    setCurrentPage(1);
  };

  const handleDeleteUsers = async () => {
    if (selectedUsers.length === 0) return;
    
    try {
      await deleteUsers(selectedUsers);
      setSelectedUsers([]);
      fetchUsers(); // Refresh the users list
    } catch (err) {
      console.error('Failed to delete users:', err);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      // Update the user in the local state to avoid a full refetch
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, isActive: !user.isActive };
        }
        return user;
      }));
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    }
  };

  const handleEditUser = (user) => {
    setCurrentEditUser(user);
    setEditUserModalVisible(true);
  };

  const handleChangePassword = (user) => {
    setCurrentEditUser(user);
    setUpdatePasswordModalVisible(true);
  };

  const handlePasswordUpdated = () => {
    // Show success notification or perform any other actions after password update
    console.log('Password updated successfully');
  };

  const handleUserUpdated = () => {
    fetchUsers(); // Refresh the users list
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Remove the user from the local state
      setUsers(users.filter(user => user.id !== userId));
      // If the user was selected, remove from selection
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleEmailUsers = () => {
    console.log('Email users:', selectedUsers);
  };

  const handleExportUsers = () => {
    console.log('Export users:', selectedUsers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showResetFilters = statusFilter !== 'all' || roleFilter !== 'all' || dateRangeFilter.from || dateRangeFilter.to;

  // Handle filter changes that should reset pagination
  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dateRange) => {
    setDateRangeFilter(dateRange);
    setCurrentPage(1);
  };

  // Handle quick filter from user row
  const handleQuickFilter = (filterType, value) => {
    if (filterType === 'role') {
      setRoleFilter(value.toLowerCase());
      // If we're setting a role filter, we should show the advanced filters
      setFiltersVisible(true);
    } else if (filterType === 'status') {
      setStatusFilter(value);
      // If we're setting a status filter, we should show the advanced filters
      setFiltersVisible(true);
    }
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader onAddUser={handleToggleAddUserForm} />

        {addUserFormVisible && (
          <AddUserComponent 
            isOpen={addUserFormVisible} 
            onClose={() => setAddUserFormVisible(false)}
            onUserAdded={handleUserAdded}
          />
        )}

        {editUserModalVisible && (
          <EditUserModal
            isOpen={editUserModalVisible}
            onClose={() => setEditUserModalVisible(false)}
            user={currentEditUser}
            onUserUpdated={handleUserUpdated}
          />
        )}

        {updatePasswordModalVisible && (
          <UpdatePasswordModal
            isOpen={updatePasswordModalVisible}
            onClose={() => setUpdatePasswordModalVisible(false)}
            user={currentEditUser}
            onPasswordUpdated={handlePasswordUpdated}
          />
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Filters and Actions */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <FilterTabs 
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          <SearchAndActions
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFiltersToggle={() => setFiltersVisible(!filtersVisible)}
            filtersVisible={filtersVisible}
            selectedUsers={selectedUsers}
            onEmailUsers={handleEmailUsers}
            onExportUsers={handleExportUsers}
            onDeleteUsers={handleDeleteUsers}
            showResetFilters={showResetFilters}
            onResetFilters={handleFilterReset}
          />

          <AdvancedFilters
            visible={filtersVisible}
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            dateRangeFilter={dateRangeFilter}
            onStatusChange={handleStatusChange}
            onRoleChange={handleRoleChange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Users Table */}
            <UsersTable
              users={users}
              selectedUsers={selectedUsers}
              onSelectUser={toggleSelectUser}
              onSelectAll={toggleSelectAll}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={toggleSort}
              onToggleUserStatus={handleToggleUserStatus}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              onChangePassword={handleChangePassword}
              filters={{
                status: statusFilter,
                role: roleFilter,
                dateFrom: dateRangeFilter.from,
                dateTo: dateRangeFilter.to,
                search: searchQuery
              }}
              onQuickFilter={handleQuickFilter}
            />

            {/* Pagination */}
            <Pagination 
              totalResults={totalResults}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
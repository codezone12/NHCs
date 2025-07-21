import React from 'react';
import TableHeader from './table-header';
import UserRow from './user-row';

const UsersTable = ({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll, 
  sortBy, 
  sortDirection, 
  onSort,
  onToggleUserStatus,
  onEditUser,
  onDeleteUser,
  onChangePassword,
  filters = {},
  onQuickFilter
}) => {
  // Get filter information for display
  const getFilterInfo = () => {
    const activeFilters = [];
    
    if (filters.status && filters.status !== 'all') {
      activeFilters.push(`Status: ${filters.status}`);
    }
    
    if (filters.role && filters.role !== 'all') {
      activeFilters.push(`Role: ${filters.role}`);
    }
    
    if (filters.dateFrom) {
      activeFilters.push(`From: ${new Date(filters.dateFrom).toLocaleDateString()}`);
    }
    
    if (filters.dateTo) {
      activeFilters.push(`To: ${new Date(filters.dateTo).toLocaleDateString()}`);
    }
    
    if (filters.search) {
      activeFilters.push(`Search: "${filters.search}"`);
    }
    
    return activeFilters.length > 0 ? activeFilters.join(' | ') : null;
  };

  const filterInfo = getFilterInfo();

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {filterInfo && (
        <div className="bg-blue-50 px-4 py-2 text-sm text-blue-700 border-b border-blue-100">
          <span className="font-medium">Active filters:</span> {filterInfo}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            selectedUsers={selectedUsers}
            totalUsers={users.length}
            onSelectAll={onSelectAll}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  isSelected={selectedUsers.includes(user.id)}
                  onSelect={onSelectUser}
                  onToggleStatus={onToggleUserStatus}
                  onEditUser={onEditUser}
                  onDeleteUser={onDeleteUser}
                  onChangePassword={onChangePassword}
                  onQuickFilter={onQuickFilter}
                />
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
    </div>
  );
};

export default UsersTable;
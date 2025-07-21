import React from 'react';

const AdvancedFilters = ({
  visible,
  statusFilter,
  roleFilter,
  dateRangeFilter,
  onStatusChange,
  onRoleChange,
  onDateRangeChange
}) => {
  if (!visible) return null;

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
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
            onChange={(e) => onRoleChange(e.target.value)}
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
              onChange={(e) => onDateRangeChange({...dateRangeFilter, from: e.target.value})}
            />
            <input
              type="date"
              className="block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={dateRangeFilter.to}
              onChange={(e) => onDateRangeChange({...dateRangeFilter, to: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
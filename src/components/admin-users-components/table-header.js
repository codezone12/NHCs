import React from 'react';
import { ChevronDown } from 'lucide-react';

const TableHeader = ({ 
  selectedUsers, 
  totalUsers, 
  onSelectAll, 
  sortBy, 
  sortDirection, 
  onSort 
}) => {
  const sortableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Join Date' },
    { key: 'timelines', label: 'Timelines' }
  ];

  const renderSortableHeader = (column) => (
    <th 
      key={column.key}
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => onSort(column.key)}
    >
      <div className="flex items-center">
        <span>{column.label}</span>
        {sortBy === column.key && (
          <ChevronDown 
            size={16} 
            className={`ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
          />
        )}
      </div>
    </th>
  );

  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded"
              checked={selectedUsers.length === totalUsers && totalUsers > 0}
              onChange={onSelectAll}
            />
          </div>
        </th>
        {renderSortableHeader({ key: 'name', label: 'Name' })}
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Role
        </th>
        {renderSortableHeader({ key: 'date', label: 'Join Date' })}
        {renderSortableHeader({ key: 'timelines', label: 'Timelines' })}
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
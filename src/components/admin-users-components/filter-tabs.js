import React from 'react';

const FilterTabs = ({ selectedFilter, onFilterChange }) => {
  const tabs = [
    { key: 'all', label: 'All Users' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
    { key: 'pending', label: 'Pending' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map(tab => (
          <button 
            key={tab.key}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              selectedFilter === tab.key 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onFilterChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FilterTabs;
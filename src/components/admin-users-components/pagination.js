import React from 'react';
import { ChevronDown } from 'lucide-react';

const Pagination = ({ totalResults }) => (
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
          Showing <span className="font-medium">1</span> to <span className="font-medium">{totalResults}</span> of{' '}
          <span className="font-medium">{totalResults}</span> results
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
);

export default Pagination;
import React, { useState } from 'react';
import { Users, BarChart2, ChevronRight, ExternalLink } from 'lucide-react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('desktop');

  return (
    <>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Users" value="5,432" change="+20.1% from last month" />
        <StatCard title="Past Month Users" value="342" change="+20.1% from last month" />
        <StatCard title="Public Timelines" value="1,243" change="+20.1% from last month" />
        <StatCard title="Private Timelines" value="892" change="+20.1% from last month" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Line Chart - Interactive</h2>
              <p className="text-sm text-gray-500">Showing total visitors for the last 3 months</p>
            </div>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 text-sm rounded-md ${activeTab === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('desktop')}
              >
                Desktop
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${activeTab === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('mobile')}
              >
                Mobile
              </button>
            </div>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Line Chart Visualization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Signups Over Time</h2>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Bar Chart Visualization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <ActivityRow 
                name="Michael Scott" 
                email="michael@example.com" 
                action="Created new timeline" 
                date="Apr 21, 2025" 
                status="completed" 
              />
              <ActivityRow 
                name="Jim Halpert" 
                email="jim@example.com" 
                action="Updated profile" 
                date="Apr 20, 2025" 
                status="pending" 
              />
              <ActivityRow 
                name="Pam Beesly" 
                email="pam@example.com" 
                action="Shared timeline" 
                date="Apr 19, 2025" 
                status="completed" 
              />
              <ActivityRow 
                name="Dwight Schrute" 
                email="dwight@example.com" 
                action="Deleted account" 
                date="Apr 18, 2025" 
                status="failed" 
              />
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            View All Activity <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

// Helper Components
const StatCard = ({ title, value, change }) => {
  const isPositive = change.includes('+');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-gray-400">
          <Users size={20} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
    </div>
  );
};

const ActivityRow = ({ name, email, action, date, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {action}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-800">
          <ExternalLink size={16} />
        </button>
      </td>
    </tr>
  );
};

export default DashboardPage;
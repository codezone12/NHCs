import React, { useState } from 'react';
import { FileText, Eye, ThumbsUp, MessageSquare, TrendingUp, ChevronRight, ExternalLink, Clock } from 'lucide-react';

const EditorDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editor Dashboard</h1>
        <p className="text-gray-500">Overview of your content performance and activity</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Published Articles" 
          value="47" 
          change="+3 this week" 
          icon={<FileText size={20} />} 
          color="green"
        />
        <StatCard 
          title="Total Views" 
          value="24,891" 
          change="+12.3% from last week" 
          icon={<Eye size={20} />} 
          color="blue"
        />
        <StatCard 
          title="Engagement Rate" 
          value="18.2%" 
          change="+2.5% from last week" 
          icon={<ThumbsUp size={20} />} 
          color="indigo"
        />
        <StatCard 
          title="Comments" 
          value="342" 
          change="+28 this week" 
          icon={<MessageSquare size={20} />} 
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Article Views */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Article Performance</h2>
              <p className="text-sm text-gray-500">Views and engagement over time</p>
            </div>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 text-sm rounded-md ${timeRange === 'week' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTimeRange('week')}
              >
                Week
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${timeRange === 'month' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTimeRange('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Views and Engagement Chart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Top Performing Articles</h2>
            <p className="text-sm text-gray-500">Based on views and engagement</p>
          </div>
          <div className="space-y-4">
            <TopArticleCard 
              title="10 Ways to Improve Your Productivity"
              date="Apr 20, 2025"
              views="5,432"
              trending={true}
            />
            <TopArticleCard 
              title="The Future of Remote Work: What to Expect in 2026"
              date="Apr 18, 2025"
              views="3,891"
              trending={true}
            />
            <TopArticleCard 
              title="How Artificial Intelligence is Changing Healthcare"
              date="Apr 15, 2025"
              views="2,745"
              trending={false}
            />
            <TopArticleCard 
              title="Climate Change: New Research and Findings"
              date="Apr 10, 2025"
              views="2,124"
              trending={false}
            />
          </div>
          <div className="mt-4">
            <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
              View All Articles <ChevronRight size={16} className="ml-1" />
            </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <ActivityRow 
                title="The Rise of Electric Vehicles" 
                action="Published" 
                date="Apr 21, 2025" 
                status="published" 
              />
              <ActivityRow 
                title="Sustainable Farming Practices" 
                action="Comment received" 
                date="Apr 20, 2025" 
                status="active" 
              />
              <ActivityRow 
                title="The Future of Quantum Computing" 
                action="Updated" 
                date="Apr 19, 2025" 
                status="published" 
              />
              <ActivityRow 
                title="Space Tourism: A New Frontier" 
                action="Draft saved" 
                date="Apr 18, 2025" 
                status="draft" 
              />
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
            View All Activity <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Content</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <UpcomingContent 
              title="Weekly Technology Roundup"
              dueDate="Apr 25, 2025"
              status="scheduled"
            />
            <UpcomingContent 
              title="Interview with Environmental Scientist"
              dueDate="Apr 28, 2025"
              status="in-progress"
            />
            <UpcomingContent 
              title="Review: Latest Smartphone Releases"
              dueDate="May 2, 2025"
              status="not-started"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
            Go to Content Calendar <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

// Helper Components
const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change.includes('+');
  const colorClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600"
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={colorClasses[color] || "text-gray-400"}>
          {icon}
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

const TopArticleCard = ({ title, date, views, trending }) => {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
          {trending && (
            <span className="ml-2">
              <TrendingUp size={16} className="text-green-600" />
            </span>
          )}
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Eye size={14} className="mr-1" /> {views} views
          </span>
        </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800">
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

const ActivityRow = ({ title, action, date, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <FileText size={16} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{title}</div>
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
        <button className="text-green-600 hover:text-green-800">
          <ExternalLink size={16} />
        </button>
      </td>
    </tr>
  );
};

const UpcomingContent = ({ title, dueDate, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <Clock size={16} />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">Due: {dueDate}</div>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`px-2 py-1 mr-4 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
          {status.replace('-', ' ')}
        </span>
        <button className="text-green-600 hover:text-green-800">
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

export default EditorDashboardPage;
import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Clock, Calendar, ChevronDown, Download, Filter } from 'lucide-react';

const EditorAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['All Categories', 'Technology', 'Science', 'Politics', 'Entertainment', 'Sports', 'Health'];

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category.toLowerCase());
    setShowCategoryDropdown(false);
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Content Analytics</h1>
        <p className="text-gray-500">Track the performance of your published content</p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        {/* Time Range Selector */}
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          <button 
            className={`px-4 py-2 text-sm rounded-md ${timeRange === 'week' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeRangeChange('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${timeRange === 'month' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeRangeChange('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${timeRange === 'quarter' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeRangeChange('quarter')}
          >
            Quarter
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${timeRange === 'year' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeRangeChange('year')}
          >
            Year
          </button>
        </div>

        {/* Category Filter & Export */}
        <div className="flex space-x-3">
          <div className="relative">
            <button 
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Filter size={16} className="mr-2" />
              {categoryFilter === 'all' ? 'All Categories' : categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
              <ChevronDown size={16} className="ml-2" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul className="py-1">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleCategoryChange(category === 'All Categories' ? 'all' : category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm text-sm hover:bg-green-700">
            <Download size={16} className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Views" 
          value="24,891" 
          change="+12.3%" 
          icon={<Users size={20} />} 
          color="blue"
        />
        <StatCard 
          title="Avg. Read Time" 
          value="4:32" 
          change="+0:45" 
          icon={<Clock size={20} />} 
          color="green"
        />
        <StatCard 
          title="Engagement Rate" 
          value="18.2%" 
          change="+2.5%" 
          icon={<TrendingUp size={20} />} 
          color="indigo"
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.8%" 
          change="+0.7%" 
          icon={<BarChart size={20} />} 
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart - Views Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Views Over Time</h2>
            <p className="text-sm text-gray-500">Daily view count for your articles</p>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Views Over Time Chart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart - Content Performance by Category */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Performance by Category</h2>
            <p className="text-sm text-gray-500">Views and engagement across different categories</p>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Category Performance Chart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - Traffic Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Traffic Sources</h2>
            <p className="text-sm text-gray-500">Where your readers are coming from</p>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Traffic Sources Chart</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Direct: 35%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Social: 25%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Search: 20%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Referral: 20%</span>
            </div>
          </div>
        </div>

        {/* Line Chart - Engagement Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Engagement Metrics</h2>
            <p className="text-sm text-gray-500">Likes, comments, and shares over time</p>
          </div>
          <div className="h-64 relative">
            {/* Placeholder for chart - We'd use a real chart library here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Engagement Metrics Chart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Content Table */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Top Performing Content</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <ArticleRow 
                title="10 Ways to Improve Your Productivity"
                category="Lifestyle"
                date="Apr 20, 2025"
                views="5,432"
                time="5:12"
                engagement="High"
              />
              <ArticleRow 
                title="The Future of Remote Work: What to Expect in 2026"
                category="Business"
                date="Apr 18, 2025"
                views="3,891"
                time="4:45"
                engagement="Medium"
              />
              <ArticleRow 
                title="How Artificial Intelligence is Changing Healthcare"
                category="Technology"
                date="Apr 15, 2025"
                views="2,745"
                time="6:20"
                engagement="High"
              />
              <ArticleRow 
                title="Climate Change: New Research and Findings"
                category="Science"
                date="Apr 10, 2025"
                views="2,124"
                time="3:50"
                engagement="Medium"
              />
              <ArticleRow 
                title="The Rise of Electric Vehicles"
                category="Technology"
                date="Apr 5, 2025"
                views="1,987"
                time="4:10"
                engagement="Low"
              />
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
            View All Articles
          </button>
        </div>
      </div>

      {/* Reader Demographics */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Reader Demographics</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Age Distribution</h3>
            <div className="space-y-3">
              <DemographicBar label="18-24" percentage={15} />
              <DemographicBar label="25-34" percentage={35} />
              <DemographicBar label="35-44" percentage={25} />
              <DemographicBar label="45-54" percentage={15} />
              <DemographicBar label="55+" percentage={10} />
            </div>
          </div>
          
          {/* Geographic Distribution */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Geographic Distribution</h3>
            <div className="space-y-3">
              <DemographicBar label="United States" percentage={45} />
              <DemographicBar label="Europe" percentage={25} />
              <DemographicBar label="Asia" percentage={15} />
              <DemographicBar label="Australia" percentage={10} />
              <DemographicBar label="Other" percentage={5} />
            </div>
          </div>
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

const ArticleRow = ({ title, category, date, views, time, engagement }) => {
  const getEngagementStyles = () => {
    switch (engagement.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{views}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{time}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEngagementStyles()}`}>
          {engagement}
        </span>
      </td>
    </tr>
  );
};

const DemographicBar = ({ label, percentage }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EditorAnalyticsPage;
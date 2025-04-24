import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Clock, Eye, ArrowUp, ArrowDown, Filter, Download, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('last30Days');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts and metrics
  const overviewMetrics = [
    { 
      title: 'Total Visitors', 
      value: '124,436', 
      change: '+12.5%', 
      trend: 'up',
      icon: <Users size={20} className="text-blue-500" />
    },
    { 
      title: 'Page Views', 
      value: '542,822', 
      change: '+18.2%', 
      trend: 'up',
      icon: <Eye size={20} className="text-purple-500" />
    },
    { 
      title: 'Avg. Session Duration', 
      value: '3m 42s', 
      change: '-2.4%', 
      trend: 'down',
      icon: <Clock size={20} className="text-orange-500" />
    },
    { 
      title: 'Bounce Rate', 
      value: '42.3%', 
      change: '-5.7%', 
      trend: 'up', // Lower bounce rate is good
      icon: <TrendingUp size={20} className="text-green-500" />
    }
  ];

  const topArticles = [
    { title: "Breaking: New Climate Policy Announced", views: 24563, category: "Politics" },
    { title: "Tech Giant Unveils Revolutionary AI Assistant", views: 18942, category: "Technology" },
    { title: "Local Sports Team Wins Championship", views: 15784, category: "Sports" },
    { title: "Financial Markets Report: Stocks Soar", views: 12453, category: "Finance" },
    { title: "New Study Reveals Health Benefits of Mediterranean Diet", views: 10876, category: "Health" }
  ];

  const trafficSources = [
    { source: "Organic Search", percentage: 42, change: "+5.2%" },
    { source: "Social Media", percentage: 28, change: "+12.3%" },
    { source: "Direct", percentage: 18, change: "-2.1%" },
    { source: "Referral", percentage: 8, change: "+1.5%" },
    { source: "Email", percentage: 4, change: "+0.8%" }
  ];

  const deviceData = [
    { device: "Mobile", percentage: 62 },
    { device: "Desktop", percentage: 31 },
    { device: "Tablet", percentage: 7 }
  ];

  const renderDateRangeSelector = () => (
    <div className="flex items-center space-x-2">
      <Calendar size={18} className="text-gray-500" />
      <select 
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7Days">Last 7 Days</option>
        <option value="last30Days">Last 30 Days</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="custom">Custom Range</option>
      </select>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className="p-2 rounded-full bg-gray-50">
                {metric.icon}
              </div>
            </div>
            <div className={`flex items-center mt-4 text-sm ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="ml-1">{metric.change} from previous period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visitors Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Visitors Over Time</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">This Period</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Previous Period</span>
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <Download size={18} />
            </button>
          </div>
        </div>
        <div className="h-80 w-full">
          {/* Placeholder for chart - in a real app, you'd use a chart library */}
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Visitor Trend Chart</span>
          </div>
        </div>
      </div>

      {/* Top Articles and Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Top Articles</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
          </div>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-sm">{article.title}</h4>
                  <span className="text-xs text-gray-500">{article.category}</span>
                </div>
                <div className="text-sm font-medium">{article.views.toLocaleString()} views</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 text-sm hover:text-blue-800">
              View All Articles
            </button>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Traffic Sources</h3>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{source.source}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{source.percentage}%</span>
                    <span className={`text-xs ${source.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {source.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-6">Device Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex items-center justify-center">
            {/* Placeholder for pie chart */}
            <div className="w-48 h-48 rounded-full bg-gray-50 flex items-center justify-center relative">
              <span className="text-gray-400">Device Chart</span>
              {/* In a real app, you'd render a pie chart here */}
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                    } mr-2`}></div>
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <span className="text-sm font-medium">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-6">Content Performance</h3>
        
        {/* Content metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Articles</p>
            <p className="text-2xl font-bold mt-1">1,243</p>
            <p className="text-xs text-green-600 mt-1">+12 this week</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Read Time</p>
            <p className="text-2xl font-bold mt-1">4m 12s</p>
            <p className="text-xs text-green-600 mt-1">+18s from last month</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Engagement Rate</p>
            <p className="text-2xl font-bold mt-1">24.8%</p>
            <p className="text-xs text-red-600 mt-1">-2.1% from last month</p>
          </div>
        </div>
        
        {/* Category performance */}
        <h4 className="text-md font-medium mb-4">Performance by Category</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articles
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Politics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">342</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,432</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="h-6 w-20 bg-gray-100 rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technology</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">287</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12,654</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28.7%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="h-6 w-20 bg-gray-100 rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sports</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">198</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9,876</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42.1%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="h-6 w-20 bg-gray-100 rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Entertainment</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">176</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7,543</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">36.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="h-6 w-20 bg-gray-100 rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Health</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">142</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6,321</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">29.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="h-6 w-20 bg-gray-100 rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-6">Audience Demographics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <div>
            <h4 className="text-md font-medium mb-4">Age Distribution</h4>
            <div className="space-y-3">
              {[
                { age: '18-24', percentage: 18 },
                { age: '25-34', percentage: 32 },
                { age: '35-44', percentage: 24 },
                { age: '45-54', percentage: 14 },
                { age: '55-64', percentage: 8 },
                { age: '65+', percentage: 4 }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.age}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gender Distribution */}
          <div>
            <h4 className="text-md font-medium mb-4">Gender Distribution</h4>
            <div className="flex items-center justify-center h-64">
              {/* Placeholder for pie chart */}
              <div className="w-48 h-48 rounded-full bg-gray-50 flex items-center justify-center relative">
                <span className="text-gray-400">Gender Chart</span>
                {/* In a real app, you'd render a pie chart here */}
              </div>
            </div>
            <div className="flex justify-center space-x-8 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Male (58%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                <span className="text-sm">Female (42%)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Location Map */}
        <div className="mt-8">
          <h4 className="text-md font-medium mb-4">Geographic Distribution</h4>
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Location Map Visualization</span>
            {/* In a real app, you'd render a map here */}
          </div>
          
          <div className="mt-6">
            <h5 className="text-sm font-medium mb-3">Top Locations</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { country: 'United States', visitors: '42,543' },
                { country: 'United Kingdom', visitors: '12,876' },
                { country: 'Canada', visitors: '8,432' },
                { country: 'Australia', visitors: '6,754' }
              ].map((location, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">{location.country}</p>
                  <p className="text-xs text-gray-500 mt-1">{location.visitors} visitors</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {renderDateRangeSelector()}
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-1.5">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'content'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('audience')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'audience'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Audience
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'content' && renderContentTab()}
          {activeTab === 'audience' && renderAudienceTab()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
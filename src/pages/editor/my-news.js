import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Edit, Trash2, Eye, MoreHorizontal, PlusCircle, FileText, Calendar } from 'lucide-react';

const MyNewsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Sample data for demonstration
  const articles = [
    {
      id: 1,
      title: 'The Rise of Electric Vehicles in Urban Environments',
      excerpt: 'Exploring how electric vehicles are transforming city transportation networks.',
      status: 'published',
      publishDate: '2025-04-21T14:30:00',
      category: 'Technology',
      views: 2437,
      comments: 18,
      featured: true
    },
    {
      id: 2,
      title: 'Sustainable Farming Practices for the Modern Age',
      excerpt: 'New methods are helping farmers reduce environmental impact while increasing yield.',
      status: 'published',
      publishDate: '2025-04-18T09:15:00',
      category: 'Environment',
      views: 1583,
      comments: 7,
      featured: false
    },
    {
      id: 3,
      title: 'The Future of Quantum Computing',
      excerpt: 'Recent breakthroughs are accelerating the development of practical quantum computers.',
      status: 'draft',
      publishDate: null,
      category: 'Technology',
      views: 0,
      comments: 0,
      featured: false
    },
    {
      id: 4,
      title: 'Space Tourism: A New Frontier',
      excerpt: 'Commercial space travel is set to become a reality for more people in the coming decade.',
      status: 'scheduled',
      publishDate: '2025-04-25T10:00:00',
      category: 'Science',
      views: 0,
      comments: 0,
      featured: true
    },
    {
      id: 5,
      title: 'Global Economic Trends for 2025',
      excerpt: 'Analysts predict significant shifts in international markets and trade relations.',
      status: 'published',
      publishDate: '2025-04-15T11:45:00',
      category: 'Business',
      views: 3210,
      comments: 24,
      featured: false
    },
    {
      id: 6,
      title: 'Advances in Artificial Intelligence and Machine Learning',
      excerpt: 'How AI is transforming industries from healthcare to finance.',
      status: 'archived',
      publishDate: '2025-03-28T16:20:00',
      category: 'Technology',
      views: 1892,
      comments: 13,
      featured: false
    }
  ];

  // Filter articles based on status and search term
  const filteredArticles = articles.filter(article => {
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort filtered articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'views') {
      return sortOrder === 'asc' ? a.views - b.views : b.views - a.views;
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (value) => {
    if (sortBy === value) {
      toggleSortOrder();
    } else {
      setSortBy(value);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My News Articles</h1>
          <p className="text-gray-500">Manage and monitor your published content</p>
        </div>
        <div className="mt-4 md:mt-0">
          <a 
            href="/editor/add-news" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <PlusCircle size={18} className="mr-2" />
            Add New Article
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 relative">
            <button 
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
            
            {showFilterMenu && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <div className="py-1">
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'all' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setFilterStatus('all'); setShowFilterMenu(false); }}
                  >
                    All Articles
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'published' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setFilterStatus('published'); setShowFilterMenu(false); }}
                  >
                    Published
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'draft' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setFilterStatus('draft'); setShowFilterMenu(false); }}
                  >
                    Drafts
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'scheduled' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setFilterStatus('scheduled'); setShowFilterMenu(false); }}
                  >
                    Scheduled
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'archived' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setFilterStatus('archived'); setShowFilterMenu(false); }}
                  >
                    Archived
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button 
                className={`px-3 py-2 border rounded-md hover:bg-gray-50 ${sortBy === 'date' ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-300 text-gray-700'}`}
                onClick={() => handleSortChange('date')}
              >
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">Date</span>
                  {sortBy === 'date' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </button>
              
              <button 
                className={`px-3 py-2 border rounded-md hover:bg-gray-50 ${sortBy === 'views' ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-300 text-gray-700'}`}
                onClick={() => handleSortChange('views')}
              >
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span className="text-sm">Views</span>
                  {sortBy === 'views' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {sortedArticles.length > 0 ? (
          <div>
            {sortedArticles.map((article) => (
              <ArticleListItem 
                key={article.id} 
                article={article} 
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">No articles found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search or filters' : 'Start by adding your first article'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination - simplified version */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {sortedArticles.length} of {articles.length} articles
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Article List Item Component
const ArticleListItem = ({ article, formatDate }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border-b border-gray-200 hover:bg-gray-50">
      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium text-gray-800 mr-2">{article.title}</h3>
            {article.featured && (
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-gray-500 mb-4 md:mb-2">{article.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(article.status)}`}>
              {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
            </span>
            
            <span>{article.category}</span>
            
            {article.publishDate && (
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(article.publishDate)}
              </span>
            )}
            
            {article.status === 'published' && (
              <>
                <span className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {article.views.toLocaleString()} views
                </span>
                
                <span className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  {article.comments} comments
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="relative mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md"
              title="Edit article"
            >
              <Edit size={18} />
            </button>
            
            <button 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
              title="View article"
            >
              <Eye size={18} />
            </button>
            
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setShowActions(!showActions)}
              title="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          {showActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Duplicate
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {article.status === 'archived' ? 'Restore' : 'Archive'}
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageSquare = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default MyNewsPage;
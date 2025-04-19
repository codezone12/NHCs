import React from 'react';

const TrendingNewsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Trending News</h2>
        <p className="text-gray-600">Stay informed with our latest news articles.</p>
      </div>
      
      {/* Top View All with Line */}
      <div className="relative mb-8">
        <div className="w-full h-px bg-gray-200 absolute top-1/2"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white pr-1">
          <button className="bg-blue-600 text-white text-xs uppercase font-medium px-4 py-1">
            View All →
          </button>
        </div>
      </div>
      
      {/* Featured Articles - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Featured Article */}
        <div className="relative group overflow-hidden rounded-lg shadow-md">
          <img 
            src="/images/cr_mining_post02.jpg.png" 
            alt="Cryptocurrency and money" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute left-4 top-4">
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">Crypto</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg mb-2">The Growing Need For Effective Password Management</h3>
            <div className="flex items-center text-xs space-x-4">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <span>27 August, 2024</span>
              </div>
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>20 Mins</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Featured Article */}
        <div className="relative group overflow-hidden rounded-lg shadow-md">
          <img 
            src="/images/cr_weekly_post04.jpg.png" 
            alt="Programming concept" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute left-4 top-4">
            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded">News</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg mb-2">Write Better CSS By Borrowing Ideas From JavaScript Functions</h3>
            <div className="flex items-center text-xs space-x-4">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <span>27 August, 2024</span>
              </div>
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>20 Mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Small Articles Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Article 1 */}
        <div className="flex items-center space-x-4">
          <div className="min-w-20 h-20 relative">
            <img 
              src="/images/bitcoin-image.png" 
              alt="Blockchain concept" 
              className="w-20 h-20 object-cover rounded-lg"  
            />
          </div>
          <div>
            <div className="mb-2">
              <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded">BITCOIN</span>
            </div>
            <h3 className="font-medium text-sm mb-1">Accessible Target Sizes Cheatsheet</h3>
            <div className="flex items-center text-xs text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span>27 August, 2024</span>
            </div>
          </div>
        </div>
        
        {/* Article 2 */}
        <div className="flex items-center space-x-4">
          <div className="min-w-20 h-20 relative">
            <img 
              src="/images/cr_mining_post05.jpg.png" 
              alt="UI Design" 
              className="w-20 h-20 object-cover rounded-lg"  
            />
          </div>
          <div>
            <div className="mb-2">
              <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded">MARKET</span>
            </div>
            <h3 className="font-medium text-sm mb-1">Color Mechanics In UI Kits</h3>
            <div className="flex items-center text-xs text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span>27 August, 2024</span>
            </div>
          </div>
        </div>
        
        {/* Article 3 */}
        <div className="flex items-center space-x-4">
          <div className="min-w-20 h-20 relative">
            <img 
              src="/images/cr_trending_post05.jpg.png" 
              alt="UX Design" 
              className="w-20 h-20 object-cover rounded-lg"  
            />
          </div>
          <div>
            <div className="mb-2">
              <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded">ECONOMY</span>
            </div>
            <h3 className="font-medium text-sm mb-1">How To Design An Effective User</h3>
            <div className="flex items-center text-xs text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span>27 August, 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom View All Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded">
          View all
        </button>
      </div>
    </div>
  );
};

export default TrendingNewsSection;
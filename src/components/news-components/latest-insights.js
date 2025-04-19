import React, { useState } from 'react';

const LatestInsightsUpdatesSection = () => {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <div className="bg-black text-white py-10 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Latest Insights and Updates</h2>
          <p className="text-gray-400">Stay informed with our latest news articles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Recent Posts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Recent Posts
                <div className="w-12 h-1 bg-yellow-400 mt-1"></div>
              </h3>
              <a href="#" className="text-xs border border-gray-600 rounded px-2 py-1 flex items-center text-gray-300 hover:text-white">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Top Row Posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Post 1 */}
              <div className="relative rounded overflow-hidden group">
                <img src="/images/cr_mining_post05.jpg.png" alt="Financial data" className="w-full h-40 object-cover" />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">MARKET</div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-sm font-medium">The Game Changing Ar Roadaily Breakfast</h4>
                  <div className="flex items-center mt-2 text-xs text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>27 AUGUST, 2024</span>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
              <div className="relative rounded overflow-hidden group">
                <img src="/images/bitcoin-image.png" alt="Blockchain" className="w-full h-40 object-cover" />
                <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">BITCOIN</div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-sm font-medium">The Game Changing Ar Roadaily Breakfast</h4>
                  <div className="flex items-center mt-2 text-xs text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>27 AUGUST, 2024</span>
                  </div>
                </div>
              </div>

              {/* Post 3 */}
              <div className="relative rounded overflow-hidden group">
                <img src="/images/cr_trending_post05.jpg.png" alt="Cryptocurrency" className="w-full h-40 object-cover" />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">ECONOMY</div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-sm font-medium">The Game Changing Ar Roadaily Breakfast</h4>
                  <div className="flex items-center mt-2 text-xs text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>27 AUGUST, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Post 4 */}
              <div className="flex bg-gray-900 rounded overflow-hidden">
                <div className="w-1/3">
                  <img src="/images/cr_mining_post01.jpg.png" alt="Market data" className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-3">
                  <div className="mb-1">
                    <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">NEWS</span>
                  </div>
                  <h4 className="text-sm font-medium mb-2">Racing Games Browned Butte Roadert Cookies Daily Breakfast</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>20 MINS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 5 */}
              <div className="flex bg-gray-900 rounded overflow-hidden">
                <div className="w-1/3">
                  <img src="/images/cr_mining_post02.jpg.png" alt="Cryptocurrency" className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-3">
                  <div className="mb-1">
                    <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded">CRYPTO</span>
                  </div>
                  <h4 className="text-sm font-medium mb-2">Racing Games Browned Butte Roadert Cookies Daily Breakfast</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>30 MINS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Featured Posts */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded p-4 mb-4">
              <div className="inline-flex rounded overflow-hidden mb-4">
                <button 
                  className={`px-6 py-2 text-sm ${activeTab === 'latest' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'}`}
                  onClick={() => setActiveTab('latest')}
                >
                  Latest News
                </button>
                <button 
                  className={`px-6 py-2 text-sm ${activeTab === 'featured' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'}`}
                  onClick={() => setActiveTab('featured')}
                >
                  Featured
                </button>
              </div>

              {/* Featured News List */}
              <div className="space-y-4">
                {/* Featured Item 1 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img src="/images/bitcoin-image.png" alt="Business meeting" className="w-16 h-16 object-cover rounded" />
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">Business</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Communication For Everyday Meetings</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                  </div>
                </div>

                {/* Featured Item 2 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img src="/images/cr_trending_post05.jpg.png" alt="Security" className="w-16 h-16 object-cover rounded" />
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">Security</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Building Your Security Strategy</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                  </div>
                </div>

                {/* Featured Item 3 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img src="/images/bitcoin-image.png" alt="Web Design" className="w-16 h-16 object-cover rounded" />
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">Design</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Phone Numbers For Web Designers</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                  </div>
                </div>

                {/* Featured Item 4 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img src="/images/cr_mining_post05.jpg.png" alt="Cooking" className="w-16 h-16 object-cover rounded" />
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">Recipes</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">The Butter Chocolate Cookies Daily</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>27 AUGUST, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestInsightsUpdatesSection;
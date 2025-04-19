import React from 'react';

const MainNewsSection = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Article - Left Side */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="relative">
            <img 
              src="/images/blue-section-image-1.png" 
              alt="Newspaper and cookies" 
              className="w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold p-4 pb-2">Latest Insights and News from NHCS</h2>
            <p className="p-4 pt-0 text-gray-600 text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        {/* Right Side Articles Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blockchain Fundraising Article */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-40">
              <img 
                src="/images/bitcoin-image.png" 
                alt="Blockchain digital concept" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">BITCOIN</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2">Blockchain Can Help with Fundraising</h3>
              <div className="flex items-center justify-start mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-400 mr-1" 
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
                <span className="text-xs text-gray-500">27 August, 2024</span>
              </div>
            </div>
          </div>

          {/* Bank Security Article */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-40">
              <img 
                src="/images/cr_mining_post05.jpg.png" 
                alt="Financial data screen" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">MARKET</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2">Benefits of Blockchain for Bank Security</h3>
              <div className="flex items-center justify-start mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-400 mr-1" 
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
                <span className="text-xs text-gray-500">27 August, 2024</span>
              </div>
            </div>
          </div>

          {/* Market Changes Article */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-40">
              <img 
                src="/images/cr_mining_post01.jpg.png" 
                alt="Business presentation" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">NEWS</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2">What You Miss in the Market Changes</h3>
              <div className="flex items-center justify-start mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-400 mr-1" 
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
                <span className="text-xs text-gray-500">27 August, 2024</span>
              </div>
            </div>
          </div>

          {/* Crypto Taxes Article */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-40">
              <img 
                src="/images/cr_mining_post02.jpg.png" 
                alt="Cryptocurrency and money" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">CRYPTO</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2">New Bill Allows to Pay Crypto Taxes</h3>
              <div className="flex items-center justify-start mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-400 mr-1" 
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
                <span className="text-xs text-gray-500">27 August, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNewsSection;
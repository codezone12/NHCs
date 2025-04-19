import React from 'react';

const Slider = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden mt-[-70px]">
      {/* Background Image */}
      <img 
        src="/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg" 
        className="absolute w-full h-full object-cover"
        alt="Colorful buildings on shore"
      />
      
      {/* Gradient overlay - dark at bottom, transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 pt-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Discover the Future of Development Documentation
            </h1>
            <p className="text-lg text-white mb-8">
              Welcome to NHCS, your go-to platform for all things development. Stay updated with the latest news and insights while engaging with our vibrant community.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/learn-more" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded font-medium transition">
                Learn More
              </a>
              <a href="/signup" className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded font-medium transition">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
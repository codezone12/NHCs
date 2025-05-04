import React from 'react';
import ImagePreview from '../image-preview';

const JoinCommunitySection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the NHCSCommunity
            </h2>
            
            <p className="text-gray-700 mb-8">
              Discover the latest news and updates from our development platform. Sign up today!
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="/news" className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                Go to News
                </span>
              </a>
              {/* <a href="/news" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
                Go to News
              </a> */}
              <a className="px-5 py-3 border-2 border-blue-500 text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-blue-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-blue-600 transition duration-[700ms] group-hover:text-white-600 ease">
                Join Community
                </span>
              </a>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <ImagePreview 
              src="/images/join-section-image.png" 
              alt="Crowd of people in yellow jackets" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
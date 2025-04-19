import React from 'react';

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
              <a href="#learn-more" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
                Learn More
              </a>
              <a href="#sign-up" className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2 rounded font-medium border border-gray-300 transition">
                Sign Up
              </a>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img 
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
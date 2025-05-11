import React from 'react';

const ThreeTornImages = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 max-w-3xl mx-auto">
          Discover Our Innovative Features for Enhanced User Engagement and Management
        </h2>
        
        {/* Features Grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            {/* Custom shaped image container with diagonal cuts */}
            <div className="relative mb-6 w-full max-w-xs">
              {/* SVG clip path for the custom shape */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <clipPath id="featureClip" clipPathUnits="objectBoundingBox">
                    <path d="M0.05,0.05 L0.95,0 L1,0.9 L0.1,1 Z" />
                  </clipPath>
                </defs>
              </svg>
              
              {/* Image with clip path applied */}
              <div className="w-full pt-[75%] relative">
                <img 
                  src="/images/newImages/Union-1.svg" 
                  alt="Admin Panel"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-2">
              Streamlined Admin Panel for Effortless Content Management and Publishing
            </h3>
            
            <p className="text-sm text-center text-gray-700 mb-4">
              Our platform offers a responsive design, ensuring optimal viewing on any device.
            </p>
            
            <a href="#learn-more" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              Learn More <span className="ml-1">›</span>
            </a>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6 w-full max-w-xs">
              <div className="w-full pt-[75%] relative">
                <img 
                  src="/images/newImages/Union-2.svg" 
                  alt="User Engagement Tools"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-2">
              User Engagement Tools to Foster Community Interaction and Feedback
            </h3>
            
            <p className="text-sm text-center text-gray-700 mb-4">
              Engage users with feedback mechanisms and timely email notifications for updates.
            </p>
            
            <a href="#explore" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              Explore <span className="ml-1">›</span>
            </a>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6 w-full max-w-xs">
              <div className="w-full pt-[75%] relative">
                <img 
                  src="/images/newImages/Union-3.svg" 
                  alt="Responsive Design"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-2">
              Responsive Design for Seamless Experience Across All Devices and Screen Sizes
            </h3>
            
            <p className="text-sm text-center text-gray-700 mb-4">
              Enjoy a consistent and engaging experience whether on mobile or desktop.
            </p>
            
            <a href="#explore" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              Explore <span className="ml-1">›</span>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ThreeTornImages;
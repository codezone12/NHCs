import React from 'react';

const ImpactStatsSection = () => {
  return (
    <section className="w-full bg-yellow-400 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          {/* Left Side - Heading */}
          <div className="w-full lg:w-1/3">
            <p className="text-gray-800 font-medium mb-2">Engagement</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Platform's Impact on User Experience
            </h2>
          </div>
          
          {/* Right Side - Description & CTA */}
          <div className="w-full lg:w-1/2">
            <p className="text-gray-800 mb-8">
              NHCS has revolutionized user interaction with its innovative features. Our platform boasts a 30% increase in user engagement, demonstrating the effectiveness of our content management system. Join us in exploring how we empower users through seamless communication and feedback.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#learn-more" className="bg-transparent hover:bg-yellow-500 text-gray-900 border border-gray-900 px-6 py-2 rounded font-medium transition inline-flex items-center">
                Learn More
              </a>
              <a href="#sign-up" className="bg-transparent hover:bg-yellow-500 text-gray-900 border border-gray-900 px-6 py-2 rounded font-medium transition inline-flex items-center">
                Sign Up <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Stat 1 */}
          <div className="text-center">
            <p className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">30%</p>
            <p className="text-gray-800">User Satisfaction Rate</p>
          </div>
          
          {/* Stat 2 */}
          <div className="text-center">
            <p className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">30%</p>
            <p className="text-gray-800">Content Engagement Growth</p>
          </div>
          
          {/* Stat 3 */}
          <div className="text-center">
            <p className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">30%</p>
            <p className="text-gray-800">Feedback Response Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;
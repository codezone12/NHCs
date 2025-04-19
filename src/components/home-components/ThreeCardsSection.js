import React from 'react';

const ThreeCardsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 uppercase text-sm tracking-wider mb-2">Streamlined</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover How Our Platform Empowers Users
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            NHCSis designed to facilitate seamless content management for admins and editors.
            With intuitive tools, users can easily create, edit, and publish news articles.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-3 rounded-md mb-6">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v10h14V7H5z"/>
                <path d="M15 10h2v2h-2v-2zm-4 0h2v2h-2v-2zM7 10h2v2H7v-2z"/>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              Admin Functionalities for Effective Management
            </h3>
            <p className="text-gray-600 text-sm">
              Admins can manage content and user roles efficiently.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-3 rounded-md mb-6">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              Editor Tools for Engaging Content Creation
            </h3>
            <p className="text-gray-600 text-sm">
              Editors have the ability to craft compelling articles.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-3 rounded-md mb-6">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385z"/>
                <path d="M11 13h2v2h-2v-2zm0-6h2v5h-2V7z"/>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              Feedback Mechanism for Continuous Improvement
            </h3>
            <p className="text-gray-600 text-sm">
              User feedback is collected and reviewed by admins.
            </p>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-4">
          <a href="#learn-more" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
            Learn More
          </a>
          <a href="#sign-up" className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2 rounded font-medium border border-gray-300 transition">
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThreeCardsSection;
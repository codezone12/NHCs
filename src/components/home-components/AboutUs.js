import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm">
          NKCS is designed to facilitate seamless content management for admins and editors. With
          intuitive tools, users can easily create, edit, and publish news articles.
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Stats */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            Highlight achievements by the numbers
          </h3>
          <p className="text-gray-600 text-sm mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
            in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor
            interdum nulla, ut commodo diam libero vitae erat.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-4xl font-bold">500+</h4>
              <p className="text-gray-600 text-sm">Projects completed</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold">200%</h4>
              <p className="text-gray-600 text-sm">Year on year growth</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold">$50m</h4>
              <p className="text-gray-600 text-sm">Funded</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold">10k</h4>
              <p className="text-gray-600 text-sm">Downloads</p>
            </div>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {/* Top image - full width */}
            <div className="col-span-2">
              <img 
                src="/images/about-us-first.png" 
                alt="Mountain landscape" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            {/* Middle right image */}
            <div className="col-span-2">
              <img 
                src="/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg" 
                alt="Coastal village" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            {/* Bottom left image with overlay */}
            <div className="relative col-span-1">
              <img 
                src="/images/about-us-third.png" 
                alt="People hiking" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 right-4 bg-yellow-400 text-blue-800 font-bold p-2 rounded">
                <p className="text-lg mb-0">10k+</p>
                <p className="text-xs">Community Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
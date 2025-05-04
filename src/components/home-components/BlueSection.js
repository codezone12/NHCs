import React from 'react';
import ImagePreview from '../image-preview';

const BlueSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#006AA7] to-[#000] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Image Collage - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-wrap justify-center gap-8 mb-8 lg:mb-10">
            {/* Top Images Row */}
            <div className="flex gap-4 justify-center md:justify-around w-full">
              <div className="w-[30%] rounded-lg overflow-hidden hover:scale-105 duration-300 shadow-lg shadow-black">
                <ImagePreview 
                  src="/images/blue-section-image-1.png" 
                  alt="Newspaper and coffee" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[30%] rounded-lg overflow-hidden md:translate-y-[40px] md:translate-x-[-40px]  hover:scale-105 duration-300 shadow-lg shadow-black">
                <ImagePreview 
                  src="/images/blue-section-image-2.png" 
                  alt="Writing tools and papers" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Bottom Images Row */}
            <div className="flex gap-4 justify-center md:justify-around w-full">
              <div className="w-[30%] rounded-lg overflow-hidden md:translate-x-[40px]  hover:scale-105 duration-300 shadow-lg shadow-black">
                <ImagePreview 
                  src="/images/blue-section-image-3.png" 
                  alt="Woman celebrating with arms raised" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[30%] rounded-lg overflow-hidden md:translate-y-[40px]  hover:scale-105 duration-300 shadow-lg shadow-black">
                <ImagePreview 
                  src="/images/blue-section-image-4.png" 
                  alt="Person reading" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Content - Right Side */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="uppercase tracking-wide text-blue-200 mb-2">Language</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Empowering Communication in English Language
            </h2>
            
            <p className="mb-10 text-blue-50">
              Our platform is designed to support English, ensuring seamless communication for all users. Experience a user-friendly interface that caters to your language needs.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-blue-600 p-3 rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-1">Global Reach</h3>
                <p className="text-sm text-blue-100 text-center lg:text-left">
                  Connect with a diverse audience through our English language support.
                </p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-blue-600 p-3 rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-1">Inclusive Design</h3>
                <p className="text-sm text-blue-100 text-center lg:text-left">
                  Our platform is crafted for users worldwide, promoting inclusivity and engagement.
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="/news" className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                Go to News
                </span>
              </a>
              {/* <a href="/news" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
                Go to News
              </a> */}
              <a className="px-5 py-3 border-2 border-white text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                  <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-gray-100 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                  Join Community
                  </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueSection;
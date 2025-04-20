import React, { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
    "/images/slider-images-2.jpg",
    "/images/slider-images-3.jpg"
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Function to handle auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden mt-0 md:mt-[-70px]">
      {/* Background Images */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image}
            className="absolute w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          
          {/* Gradient overlay - dark at bottom, transparent at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Discover the Future of Development Documentation
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8">
              Welcome to NHCS, your go-to platform for all things development. Stay updated with the latest news and insights while engaging with our vibrant community.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="/learn-more" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded font-medium transition text-sm md:text-base">
                Learn More
              </a>
              <a href="/signup" className="bg-transparent hover:bg-white/10 text-white border border-white px-4 md:px-6 py-2 md:py-3 rounded font-medium transition text-sm md:text-base">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-yellow-400 scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
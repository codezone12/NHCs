import React, { useState, useEffect } from 'react';

const FeaturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Feature data
  const features = [
    {
      image: "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      title: "Streamlined Admin Panel for Effortless Content Management and Publishing",
      description: "Our platform offers a responsive design, ensuring optimal viewing on any device.",
      link: "#learn-more",
      linkText: "Learn More"
    },
    {
      image: "/images/slider-images-2.jpg",
      title: "User Engagement Tools to Foster Community Interaction and Feedback",
      description: "Engage users with feedback mechanisms and timely email notifications for updates.",
      link: "#explore",
      linkText: "Explore"
    },
    {
      image: "/images/slider-images-3.jpg",
      title: "Responsive Design for Seamless Experience Across All Devices and Screen Sizes",
      description: "Enjoy a consistent and engaging experience whether on mobile or desktop.",
      link: "#explore",
      linkText: "Explore"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-4 bg-yellow-400">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 max-w-3xl mx-auto">
          Discover Our Innovative Features for Enhanced User Engagement and Management
        </h2>
        
        {/* Slider Container */}
        <div className="relative">
          {/* Slide Indicators */}
          <div className="flex justify-center mb-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-2 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slides */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col items-center">
                    {/* Box Image */}
                    <div className="mb-6 w-full max-w-md">
                      <div className="w-full pt-[75%] relative rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-center mb-2 max-w-md">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-center text-gray-700 mb-4 max-w-md">
                      {feature.description}
                    </p>
                    
                    {/* <button href={feature.link} className="bg-blue-600 hover:bg-blue-700 text-white p-2 px-4 rounded-md flex items-center text-sm font-semibold">
                      {feature.linkText} <span className="ml-1">›</span>
                    </button> */}
                    <a href={feature.link} className="px-5 py-3 border-2 border-blue-500 text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                      <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-blue-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                      <span className="relative text-blue-700 transition duration-[700ms] group-hover:text-white ease">
                      {feature.linkText} <span className="ml-1">›</span>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? features.length - 1 : prev - 1))}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all"
            aria-label="Previous slide"
          >
            <span className="text-xl font-bold">‹</span>
          </button>
          
          <button 
            onClick={() => setCurrentSlide(prev => (prev === features.length - 1 ? 0 : prev + 1))}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all"
            aria-label="Next slide"
          >
            <span className="text-xl font-bold">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSlider;
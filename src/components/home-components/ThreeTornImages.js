import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FeaturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Feature data - 6 items total
  const features = [
    {
      image: "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      title: "Streamlined Admin Panel",
      description: "Our platform offers a responsive design, ensuring optimal viewing on any device.",
      link: "#learn-more",
      linkText: "Learn More"
    },
    {
      image: "/images/slider-images-2.jpg",
      title: "User Engagement Tools",
      description: "Engage users with feedback mechanisms and timely email notifications for updates.",
      link: "#explore",
      linkText: "Explore"
    },
    {
      image: "/images/slider-images-3.jpg",
      title: "Responsive Design",
      description: "Enjoy a consistent and engaging experience whether on mobile or desktop.",
      link: "#explore",
      linkText: "Explore"
    },
    {
      image: "/images/cr_weekly_post04.jpg.png",
      title: "Analytics Dashboard",
      description: "Track user behavior and content performance with our comprehensive analytics.",
      link: "#learn-more",
      linkText: "Learn More"
    },
    {
      image: "/images/cr_trending_post05.jpg.png",
      title: "Content Scheduling",
      description: "Plan and automate your content publication for maximum audience reach.",
      link: "#discover",
      linkText: "Discover"
    },
    {
      image: "/images/cr_mining_post05.jpg.png",
      title: "Integration Capabilities",
      description: "Connect seamlessly with your favorite tools and services for enhanced workflow.",
      link: "#integrate",
      linkText: "Integrate"
    }
  ];

  // Create an extended array for infinite scroll effect
  // We duplicate the items to create a seamless transition
  const extendedFeatures = [...features, ...features, ...features];

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        // When we reach the end of the first duplicate set, reset to the beginning of the second set
        if (nextIndex === features.length * 2) {
          return features.length;
        }
        return nextIndex;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Manual navigation
  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - 1;
      if (nextIndex < 0) {
        return features.length * 2 - 1;
      }
      return nextIndex;
    });
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      if (nextIndex >= features.length * 3) {
        return features.length;
      }
      return nextIndex;
    });
  };

  // Calculate the transform value based on items per view
  const transformValue = `translateX(-${(currentIndex * (100 / itemsPerView))}%)`;

  return (
    <section className="py-8 md:py-16 px-4 bg-yellow-400">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-16 max-w-3xl mx-auto px-4">
          Discover Our Innovative Features for Enhanced User Engagement
        </h2>
        
        {/* Slider Container */}
        <div className="relative">
          {/* Slide Indicators */}
          <div className="flex justify-center mb-6 md:mb-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index + features.length)}
                className={`w-2 h-2 md:w-3 md:h-3 mx-1 md:mx-2 rounded-full transition-colors duration-300 ${
                  currentIndex % features.length === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slides - showing dynamic number based on screen size */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: transformValue }}
            >
              {extendedFeatures.map((feature, index) => (
                <div 
                  key={`${feature.title}-${index}`} 
                  className={`flex-shrink-0 px-2 md:px-4 ${
                    itemsPerView === 1 ? 'w-full' : 
                    itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                  }`}
                >
                  <div className="flex flex-col items-center h-full bg-white rounded-lg shadow-md p-4 md:p-6">
                    {/* Box Image */}
                    <div className="mb-4 md:mb-6 w-full">
                      <div className="w-full pt-[75%] relative rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-center text-gray-700 mb-4">
                      {feature.description}
                    </p>
                    
                    <a 
                      href={feature.link} 
                      className="mt-auto px-3 py-2 md:px-5 md:py-3 border-2 border-blue-500 text-sm md:text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-700 z-10"
                    >
                      <span className="absolute w-64 h-0 transition-all duration-700 origin-center rotate-45 -translate-x-16 bg-blue-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                      <span className="relative text-blue-700 transition duration-700 group-hover:text-white ease">
                        {feature.linkText} <span className="ml-1">›</span>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows - Responsive sizing */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all"
            aria-label="Previous slide"
          >
            <span className="text-lg md:text-xl font-bold">
              <ChevronLeft size={20} />
            </span>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all"
            aria-label="Next slide"
          >
            <span className="text-lg md:text-xl font-bold">
              <ChevronRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSlider;
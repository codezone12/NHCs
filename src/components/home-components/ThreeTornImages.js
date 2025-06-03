import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FeaturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Typewriter animation states
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const headings = [
    [
      { text: "Where Three Generations", color: "text-red-500" },
      { text: " Come Together ", color: "text-white" },
      { text: "Under one Roof.", color: "text-blue-600" }
    ],
    [
      { text: "Unlock", color: "text-red-500" },
      { text: " the Power of the ", color: "text-white" },
      { text: "Eritrean Diaspora", color: "text-blue-600" }
    ]
  ];

  // Get full text for current heading
  const getCurrentFullText = () => {
    return headings[currentHeadingIndex].map(segment => segment.text).join('');
  };
  
  // Feature data - 6 items total
  const features = [
    {
      image: "/images/newImages/IMG_0204.JPG",
      title: "Streamlined Admin Panel",
      description: "Our platform offers a responsive design, ensuring optimal viewing on any device.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Learn More"
    },
    {
      image: "/images/newImages/IMG_6640.JPG",
      title: "User Engagement Tools",
      description: "Engage users with feedback mechanisms and timely email notifications for updates.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Explore"
    },
    {
      image: "/images/newImages/IMG_7246.JPG",
      title: "Responsive Design",
      description: "Enjoy a consistent and engaging experience whether on mobile or desktop.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Explore"
    },
    {
      image: "/images/newImages/IMG_6654.JPG",
      title: "Analytics Dashboard",
      description: "Track user behavior and content performance with our comprehensive analytics.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Learn More"
    },
    {
      image: "/images/newImages/rollerCoaster1.jpg",
      title: "Content Scheduling",
      description: "Plan and automate your content publication for maximum audience reach.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Discover"
    },
    {
      image: "/images/newImages/IMG_8764.JPG",
      title: "Integration Capabilities",
      description: "Connect seamlessly with your favorite tools and services for enhanced workflow.",
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Integrate"
    }
  ];

  // Create an extended array for infinite scroll effect
  const extendedFeatures = [...features, ...features, ...features];

  // Typewriter animation effect
  useEffect(() => {
    const fullText = getCurrentFullText();
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        } else {
          // Wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
        } else {
          // Move to next heading
          setIsDeleting(false);
          setCurrentHeadingIndex(prev => (prev + 1) % headings.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentHeadingIndex]);

  // Render text with colors
  const renderColoredText = () => {
    const currentHeading = headings[currentHeadingIndex];
    let charCount = 0;
    const result = [];
    
    for (let i = 0; i < currentHeading.length; i++) {
      const segment = currentHeading[i];
      const segmentStart = charCount;
      const segmentEnd = charCount + segment.text.length;
      
      if (displayedText.length > segmentStart) {
        const visiblePart = displayedText.substring(segmentStart, Math.min(segmentEnd, displayedText.length));
        if (visiblePart) {
          result.push(
            <span key={i} className={segment.color}>
              {visiblePart}
            </span>
          );
        }
      }
      
      charCount += segment.text.length;
    }
    
    return result;
  };

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
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

  const transformValue = `translateX(-${(currentIndex * (100 / itemsPerView))}%)`;

  return (
    <section className="py-8 md:py-16 px-4 bg-yellow-400">
      <div className="container mx-auto">
        {/* Typewriter Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-16 max-w-3xl mx-auto px-4 min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem] flex items-center justify-center">
          <span className="inline-block">
            {renderColoredText()}
            <span className="animate-pulse text-white">|</span>
          </span>
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
          
          {/* Slides */}
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
          
          {/* Navigation Arrows */}
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
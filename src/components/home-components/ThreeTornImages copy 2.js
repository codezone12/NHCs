import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FeaturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [typewriterText, setTypewriterText] = useState('');
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  
  // Define the two headings with their colors
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
  
  // Feature data - 6 items total with expanded content
  const features = [
    {
      image: "/images/newImages/IMG_0204.JPG",
      title: "Streamlined Admin Panel",
      description: "Our platform offers a responsive design, ensuring optimal viewing on any device.",
      expandedContent: [
        "Built with modern React architecture for lightning-fast performance",
        "Intuitive drag-and-drop interface for easy content management",
        "Real-time collaboration tools for team-based administration",
        "Advanced user role management and permission systems",
        "Comprehensive audit logs and activity tracking"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Learn More"
    },
    {
      image: "/images/newImages/IMG_6640.JPG",
      title: "User Engagement Tools",
      description: "Engage users with feedback mechanisms and timely email notifications for updates.",
      expandedContent: [
        "Smart notification system with customizable triggers",
        "Interactive feedback forms with sentiment analysis",
        "Gamification elements to boost user participation",
        "Social sharing integration across multiple platforms",
        "Automated email campaigns with A/B testing capabilities"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Explore"
    },
    {
      image: "/images/newImages/IMG_7246.JPG",
      title: "Responsive Design",
      description: "Enjoy a consistent and engaging experience whether on mobile or desktop.",
      expandedContent: [
        "Mobile-first design approach for optimal touch interactions",
        "Progressive Web App (PWA) capabilities for offline access",
        "Cross-browser compatibility tested on 15+ browsers",
        "Adaptive layouts that work seamlessly on any screen size",
        "Touch-friendly gestures and intuitive navigation patterns"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Explore"
    },
    {
      image: "/images/newImages/IMG_6654.JPG",
      title: "Analytics Dashboard",
      description: "Track user behavior and content performance with our comprehensive analytics.",
      expandedContent: [
        "Real-time data visualization with interactive charts",
        "Custom KPI tracking and goal-setting capabilities",
        "Heat mapping to understand user interaction patterns",
        "Export functionality for detailed reporting",
        "Predictive analytics powered by machine learning"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Learn More"
    },
    {
      image: "/images/newImages/rollerCoaster1.jpg",
      title: "Content Scheduling",
      description: "Plan and automate your content publication for maximum audience reach.",
      expandedContent: [
        "Bulk upload and scheduling for multiple content pieces",
        "Timezone-aware publishing for global audience reach",
        "Content calendar with drag-and-drop rescheduling",
        "Automated social media cross-posting",
        "Performance-based optimal timing suggestions"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Discover"
    },
    {
      image: "/images/newImages/IMG_8764.JPG",
      title: "Integration Capabilities",
      description: "Connect seamlessly with your favorite tools and services for enhanced workflow.",
      expandedContent: [
        "200+ pre-built integrations with popular tools",
        "RESTful API for custom integration development",
        "Webhook support for real-time data synchronization",
        "Single sign-on (SSO) compatibility",
        "Data migration tools for easy platform switching"
      ],
      link: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com",
      linkText: "Integrate"
    }
  ];

  // Create an extended array for infinite scroll effect
  const extendedFeatures = [...features, ...features, ...features];

  // Get the full text of current heading
  const getCurrentHeadingText = () => {
    return headings[currentHeadingIndex].map(part => part.text).join('');
  };

  // Typewriter effect with cycling between headings
  useEffect(() => {
    const currentFullText = getCurrentHeadingText();
    
    let timeout;
    
    if (isTyping) {
      // Typing phase
      if (typewriterText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentFullText.slice(0, typewriterText.length + 1));
        }, 80);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Deleting phase
      if (typewriterText.length > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(typewriterText.slice(0, -1));
        }, 50);
      } else {
        // Finished deleting, switch to next heading
        timeout = setTimeout(() => {
          setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
          setIsTyping(true);
        }, 500);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [typewriterText, currentHeadingIndex, isTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Render the colored text based on current typewriter progress
  const renderColoredText = () => {
    const currentHeading = headings[currentHeadingIndex];
    let charCount = 0;
    
    return currentHeading.map((part, index) => {
      const partStart = charCount;
      const partEnd = charCount + part.text.length;
      charCount += part.text.length;
      
      // Determine how much of this part should be visible
      const visibleStart = Math.max(0, Math.min(typewriterText.length - partStart, part.text.length));
      const visibleText = part.text.slice(0, visibleStart);
      
      return (
        <span key={index} className={part.color}>
          {visibleText}
        </span>
      );
    });
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

  // Auto-rotate slides (only when not paused)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex === features.length * 2) {
          return features.length;
        }
        return nextIndex;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length, isPaused]);

  // Handle expand/collapse
  const toggleExpanded = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
    <section 
      className="py-8 md:py-16 px-4 relative"
      style={{
        backgroundImage: "url('/images/NewPics/child-image.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Semi-transparent yellow overlay */}
      <div className="absolute inset-0 bg-yellow-400 opacity-0"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Title with Typewriter Effect */}
        <div className="text-center h-[100px] mb-8 md:mb-16 max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold min-h-[3rem] md:min-h-[4rem]">
            {renderColoredText()}
            {showCursor && (
              <span className="animate-pulse text-blue-600">|</span>
            )}
          </h2>
        </div>
        
        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
              {extendedFeatures.map((feature, index) => {
                const isExpanded = expandedCards[index];
                return (
                  <div 
                    key={`${feature.title}-${index}`} 
                    className={`flex-shrink-0 px-2 md:px-4 ${
                      itemsPerView === 1 ? 'w-full' : 
                      itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                    }`}
                  >
                    <div className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      {/* Image Section */}
                      <div className="w-full p-4 md:p-6 pb-2">
                        <div className="w-full pt-[75%] relative rounded-lg overflow-hidden shadow-lg">
                          <img 
                            src={feature.image} 
                            alt={feature.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-col flex-grow p-4 md:p-6 pt-2">
                        <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
                          {feature.title}
                        </h3>
                        
                        <p className="text-xs md:text-sm text-center text-gray-700 mb-4">
                          {feature.description}
                        </p>
                        
                        {/* Expandable Content */}
                        <div className="mb-4">
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                          >
                            <span className="mr-2">
                              {isExpanded ? 'Show Less' : 'Show More'}
                            </span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="space-y-2">
                              {feature.expandedContent.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex}
                                  className="flex items-start text-xs md:text-sm text-gray-600 animate-fadeIn"
                                  style={{ animationDelay: `${itemIndex * 100}ms` }}
                                >
                                  <span className="text-blue-500 mr-2 mt-1">•</span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* CTA Button */}
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
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md z-10 hover:bg-opacity-100 transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Pause Indicator */}
          {isPaused && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
              Paused
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ThreeTornImages;
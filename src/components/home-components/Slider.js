import React, { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    "https://nchs-fe.vercel.app/images/newImages/DSC_0468.JPG",
    "https://nchs-fe.vercel.app/images/newImages/DSC_0890.JPG",
    "https://nchs-fe.vercel.app/images/newImages/DSC_0446-001.JPG"
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [expandedContent, setExpandedContent] = useState({});
  
  const contentItems = [
    {
      heading: [
        { text: "Unlock", color: "text-yellow-500" },
        { text: " the Power of the ", color: "text-white" },
        { text: "Eritrean Diaspora", color: "text-blue-600" }
      ],
      content: "The Eritrean diaspora is more than just a community—it's a dynamic force. With deep cultural roots, vibrant traditions, and an unbreakable sense of unity, Eritreans worldwide have built a powerful network that thrives on connection, resilience, and integration. From rich cultural celebrations to entrepreneurial spirit, Eritreans are shaping industries, influencing global conversations, and fostering a strong identity wherever they go. Their ability to blend tradition with innovation makes them invaluable in any space—be it business, entertainment, or social development.",
      preview: "The Eritrean diaspora is more than just a community—it's a dynamic force. With deep cultural roots, vibrant traditions, and an unbreakable sense of unity, Eritreans worldwide have built a powerful network.",
      hasReadMore: true
    },
    {
      heading: [
        { text: "Where three generations", color: "text-yellow-500" },
        { text: " come together ", color: "text-white" },
        { text: "under one roof.", color: "text-blue-600" }
      ],
      content: "Welcome to Alenalki.se – a dynamic force for unity. A bridge connecting people and communities, built on trust, collaboration, and inclusive engagement. Through articles, podcasts, and video discussions, we amplify voices, strengthen connections, and promote meaningful dialogue. Join us on social media to be part of the conversation and stay informed.",
      hasReadMore: false
    }
  ];

  // Get full text for current heading
  const getCurrentHeadingText = () => {
    return contentItems[currentContent].heading.map(part => part.text).join('');
  };

  // Get styled heading parts based on current display
  const getStyledHeading = () => {
    const heading = contentItems[currentContent].heading;
    let charCount = 0;
    const result = [];

    for (let i = 0; i < heading.length; i++) {
      const part = heading[i];
      const partLength = part.text.length;
      const startChar = charCount;
      const endChar = charCount + partLength;
      
      if (charIndex > startChar) {
        const visibleChars = Math.min(charIndex - startChar, partLength);
        const visibleText = part.text.substring(0, visibleChars);
        if (visibleText) {
          result.push({
            text: visibleText,
            color: part.color
          });
        }
      }
      
      charCount += partLength;
    }
    
    return result;
  };

  // Typewriter effect
  useEffect(() => {
    const currentText = getCurrentHeadingText();
    
    const typewriterInterval = setInterval(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentContent(prev => (prev + 1) % contentItems.length);
          setCurrentSlide(prev => (prev + 1) % images.length);
        }
      } else if (isTyping) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait 2 seconds before deleting
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearInterval(typewriterInterval);
  }, [charIndex, isTyping, isDeleting, currentContent]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setCurrentContent(index % contentItems.length);
    setCharIndex(0);
    setIsTyping(true);
    setIsDeleting(false);
  };

  // Toggle read more functionality
  const toggleReadMore = (index) => {
    setExpandedContent(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="relative w-full h-screen md:h-[80vh] overflow-hidden mt-0 md:mt-[-0px]">
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
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12">
          <div className="max-w-4xl">
            {/* Typewriter Heading */}
            <div className="min-h-[120px] md:min-h-[140px] mb-4">
              <h1 className="text-3xl md:text-5xl max-w-[600px] font-bold leading-tight">
                {getStyledHeading().map((part, index) => (
                  <span key={index} className={part.color}>
                    {part.text}
                  </span>
                ))}
                <span className="animate-pulse text-white">|</span>
              </h1>
            </div>
            
            {/* Content with Read More */}
            <div className="min-h-[200px] md:min-h-[240px]">
              {contentItems.map((item, index) => {
                const isExpanded = expandedContent[index];
                const shouldShow = index === currentContent;
                
                return (
                  <div
                    key={index}
                    className={`transition-opacity duration-500 ${
                      shouldShow ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                  >
                    <p className="text-base md:text-lg text-white mb-4 max-w-[800px] leading-relaxed">
                      {item.hasReadMore && !isExpanded ? item.preview : item.content}
                    </p>
                    {item.hasReadMore && (
                      <button
                        onClick={() => toggleReadMore(index)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-medium mb-6 md:mb-8"
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                    {!item.hasReadMore && (
                      <div className="mb-6 md:mb-8"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="/news" className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                  Go to News
                </span>
              </a>
              <a href='https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com' className="px-5 py-3 border-2 border-white text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-gray-100 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                  Join alenalki
                </span>
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